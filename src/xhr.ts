import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from './types'
import { parseHeaders } from './helpers/headers'
import { createError } from './helpers/error'
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { method = 'GET', data = null, url, headers, responseType, timeout } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    request.open(method, url, true)

    request.onreadystatechange = () => {
      console.log('request.readyState', request.readyState);
      
      if (request.readyState !== 4) return
      // 发生网络错误的时候  status是0
      if (request.status === 0) return
      const responseData = request.responseType === 'text' ? request.responseText : request.response
      const responseHeaders = request.getAllResponseHeaders()
      const res: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: parseHeaders(responseHeaders),
        config: config,
        request: request
      }
      
      handleResponse(res)
    }

    function handleResponse (res: AxiosResponse) {
      if (res.status >= 200 && res.status < 300) {
        resolve(res)
      } else {
        reject(createError(`Request failed with status code ${res.status}`, config, null, request, res))
      }
    }

    request.onerror = function () {
      reject(createError('Network Error', config, null, request))
    }

    request.ontimeout = function () {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', request))
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })
}
