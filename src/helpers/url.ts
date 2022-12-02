import { isDate, isPlainObject } from './utils'

function encode(val: string): string {
  // encode 不转义部分特殊字符进行处理
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2c/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildUrl(url: string, params?: any): string {
  if (!params) return url

  const parts: string[] = []

  Object.keys(params).forEach(key => {
    const val = params[key]
    // params value 空值忽略
    if (val === null || val === undefined) return
    let values = []
    // 先判断params的value值是不是数组
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach(v => {
      if (isDate(v)) {
        v = v.toISOString()
      } else if (isPlainObject(v)) {
        v = JSON.stringify(v)
      }
      parts.push(`${encode(key)}=${encode(v)}`)
    })
  })

  let serializedParams = parts.join('&')

  if (serializedParams) {
    let hashIndex = url.indexOf('#')
    // 判断url中有没有hash标志#
    if (hashIndex !== -1) {
      url = url.slice(0, hashIndex)
    }
    url = (url.includes('?') ? url + '&' : url + '?') + serializedParams
  }

  return url
}
