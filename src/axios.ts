import Axios from './core/axios'
import { AxiosInstance } from './types/index'
import { extend } from './helpers/utils'

function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)
  extend(instance, context)
  return instance as AxiosInstance
}

const axios = createInstance()

export default axios
