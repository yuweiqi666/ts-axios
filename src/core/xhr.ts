import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout } = config

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url!, true)

    request.onreadystatechange = function() {
      if (request.readyState !== 4) return

      if (request.status === 0) return

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())

      const responseData = responseType !== 'text' ? request.response : request.responseText

      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      // resolve(response)
      handleResponse(response)
    }

    request.onerror = function() {
      reject(createError('Network Error', config, null, request))
    }

    request.ontimeout = function() {
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

    function handleResponse(response: AxiosResponse): void {
      if (request.status >= 200 && request.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${request.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
