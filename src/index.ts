import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index'

import xhr from './xhr'

import { buildUrl } from './helpers/url'

import { transformRequest, transformResponse } from './helpers/data'

import { processHeaders } from './helpers/headers'

function axios(config: AxiosRequestConfig): AxiosPromise {
  // 发送请求前的处理
  processConfig(config)
  // 发送ajax
  return xhr(config).then(res => {
    return transformResponseDate(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  // params参数拼接url
  config.url = transformUrl(config)
  // headers处理
  config.headers = transformHeaders(config)
  // data参数处理
  config.data = transformRequestDate(config)
}

function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url, params)
}

function transformRequestDate(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseDate(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}

export default axios
