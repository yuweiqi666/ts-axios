import { AxiosPromise, AxiosRequestConfig, AxiosResponse, Method, RejectedFn, ResolveFn } from "../types";
import { requestDispatch } from "./requestDispatch";
import InterceptorManager from "./interceptorManager";

interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>
  response: InterceptorManager<AxiosResponse>
}

interface PromiseChain<T> {
  resolved: ResolveFn<T> | ((config: AxiosRequestConfig) => AxiosPromise)
  rejected?: RejectedFn
}

export default class Axios {
  interceptors: Interceptors

  constructor() {
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }


  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }

    const promiseChain: PromiseChain<any>[] = [{
      resolved: requestDispatch,
      rejected: undefined
    }]

    this.interceptors.request.forEach(interceptor => {
      promiseChain.unshift(interceptor)
    })

    this.interceptors.response.forEach(interceptor => {
      promiseChain.push(interceptor)
    })

    let promise = Promise.resolve(config)

    while (promiseChain.length) {
      const { resolved, rejected } = promiseChain.shift()!

      promise = promise.then(resolved, rejected)
    }

    return promise
  }

  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData('get', url, config)
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData('delete', url, config)
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData('head', url, config)
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithoutData('options', url, config)
  }

  post(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithData('post', url, data, config)
  }

  put(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithData('put', url, data, config)
  }

  patch(url: string, data: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestWithData('patch', url, data, config)
  }

  _requestWithoutData(method: Method, url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.request({
      ...config,
      method,
      url
    })
  }

  _requestWithData(method: Method, url: string, data: any, config?: AxiosRequestConfig) {
    return this.request({
      ...config || {},
      method,
      url,
      data
    })
  }
}