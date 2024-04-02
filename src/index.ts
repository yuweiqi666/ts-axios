import Axios from './core/Axios'
import { extend } from './helpers/utils'
import { AxiosInstance } from './types/index'

function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosInstance
}

const axios = createInstance()


export * from './types/index'

export default axios