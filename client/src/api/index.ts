import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'

import {ErrorModel} from '../models/error.model'
import {ConfigModel} from '../models/config.model'

export const apiUrl = process.env.REACT_APP_API_URL || '/api'
const getAuthToken = (): string | null => localStorage.getItem('x-cgen-auth')

const handleCatch = (error: any) => {
  if (error.response) {
    return error.response.data as ErrorModel
  } else {
    return {
      error: 'Error',
      message: error.message,
      statusCode: 400,
    } as ErrorModel
  }
}

export const get = async <T>({url, ...config}: AxiosRequestConfig) =>
  axios
    .get<T>(`${apiUrl}/${url}`, {
      headers: {'x-cgen-auth': getAuthToken()},
      ...config,
    })
    .catch(handleCatch)

export const post = async <T>({url, data, ...config}: AxiosRequestConfig) =>
  await axios
    .post<T>(`${apiUrl}/${url}`, data, {
      headers: {'x-cgen-auth': getAuthToken()},
      ...config,
    })
    .catch(handleCatch)

export const put = async <T>({url, data, ...config}: AxiosRequestConfig) =>
  await axios
    .put<T>(`${apiUrl}/${url}`, data, {
      headers: {'x-cgen-auth': getAuthToken()},
      ...config,
    })
    .catch(handleCatch)

export const handleErrors = <T>(response: ErrorModel | AxiosResponse<T>) => {
  const error = response as ErrorModel
  const acceptableErrors = [400, 401, 500]

  if (error && acceptableErrors.includes(error.statusCode)) {
    throw new Error(error.message)
  }

  return (response as AxiosResponse<T>).data
}

export const getConfig = async (): Promise<ConfigModel> => {
  const response = await get<ConfigModel>({url: 'config'})

  return handleErrors(response)
}
