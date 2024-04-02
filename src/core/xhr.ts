import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    const request = new XMLHttpRequest()
    if (responseType) {
      request.responseType = responseType
    }
    request.onreadystatechange = function () {
      if (request.readyState !== 4) return

      // 网络错误 或者超时错误
      if (request.status === 0) return

      const responseHeaders = request.getAllResponseHeaders()
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: parseHeaders(responseHeaders),
        config,
        request
      }
      handleResponse(response)
    }
    // 网络错误回调函数
    request.onerror = function () {
      reject(createError('Network Error', config, null, request))
    }
    // 设置超时
    if (timeout) {
      request.timeout = timeout
    }
    // 响应超时回调函数
    request.ontimeout = function () {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }


    request.open(method.toUpperCase(), url, true)
    for (let key in headers) {
      // 没有body数据的场景下 传content-type没有意义 有的话要删除
      if (data === null && key.toLowerCase() === 'content-type') {
        delete headers[key]
      } else {
        request.setRequestHeader(key, headers[key])
      }
    }
    request.send(data)

    // 处理状态码非200错误
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(createError(`Request failed with status code ${response.status}`, config, null, request, response))
      }
    }

  })
}
