import { isPlainObject } from "./utils";

function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeader(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=uyf-8'
    }
  }
  return headers
}

export function parseHeaders(headers: string): any {
  const parsed = Object.create(null)
  if (!headers) return parsed
  const headersArr = headers.split('\r\n')
  headersArr.forEach(line => {
    let [key, value] = line.split(':')
    if (!key) return
    key = key.trim().toLowerCase()
    if (value) {
      value = value.trim()
      parsed[key] = value
    }
  })
  return parsed
}