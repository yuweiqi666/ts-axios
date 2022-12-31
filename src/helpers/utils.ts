const toString = Object.prototype.toString

// 判断是不是Date数组
export function isDate(value: any): value is Date {
  return toString.call(value) === '[object Date]'
}

// 判断是不是object类型
// export function isObject(value: any): value is Object {
//   return typeof value === 'object' && value !== null
// }

// 判断是不是普通对象
export function isPlainObject(value: any): value is Object {
  return toString.call(value) === '[object Object]'
}

export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}
