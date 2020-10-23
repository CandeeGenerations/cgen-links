import {GoogleLoginResponse} from 'react-google-login'
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import {
  Click,
  ClickModel,
  ErrorModel,
  Link,
  LinkInput,
  LinkModel,
  User,
  ConfigModel,
  SettingsModel,
  SettingsInput,
} from '../models/models'

const apiUrl = process.env.REACT_APP_API_URL || '/api'
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

const get = async <T>({url, ...config}: AxiosRequestConfig) =>
  axios
    .get<T>(`${apiUrl}/${url}`, {
      headers: {'x-cgen-auth': getAuthToken()},
      ...config,
    })
    .catch(handleCatch)

const post = async <T>({url, data, ...config}: AxiosRequestConfig) =>
  await axios
    .post<T>(`${apiUrl}/${url}`, data, {
      headers: {'x-cgen-auth': getAuthToken()},
      ...config,
    })
    .catch(handleCatch)

const put = async <T>({url, data, ...config}: AxiosRequestConfig) =>
  await axios
    .put<T>(`${apiUrl}/${url}`, data, {
      headers: {'x-cgen-auth': getAuthToken()},
      ...config,
    })
    .catch(handleCatch)

const handleErrors = <T>(response: ErrorModel | AxiosResponse<T>) => {
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

export const findAllLinks = async (): Promise<LinkModel[]> => {
  const response = await get<LinkModel[]>({url: 'link'})

  return handleErrors(response)
}

export const findLinkById = async (id: string): Promise<LinkModel> => {
  const response = await get<LinkModel>({url: `link/id/${id}`})

  return handleErrors(response)
}

export const createLink = async (input: LinkInput): Promise<LinkModel> => {
  const response = await post<LinkModel>({url: 'link', data: {...input}})

  return handleErrors(response)
}

export const updateLink = async (
  id: string,
  input: Link,
): Promise<LinkModel> => {
  const response = await put<LinkModel>({
    url: `link/${id}`,
    data: {...input},
  })

  return handleErrors(response)
}

export const findAllClicks = async (): Promise<ClickModel[]> => {
  const response = await get<ClickModel[]>({url: 'click'})

  return handleErrors(response)
}

export const findAllClicksByLinkId = async (
  linkId: string,
): Promise<ClickModel[]> => {
  const response = await get<ClickModel[]>({url: `click/${linkId}`})

  return handleErrors(response)
}

export const createClick = async (input: Click): Promise<ClickModel> => {
  const response = await post<ClickModel>({url: 'click', data: {...input}})

  return handleErrors(response)
}

export const findSettingsByUserId = async (
  userId: string,
): Promise<SettingsModel> => {
  const response = await get<SettingsModel>({url: `settings/${userId}`})

  return handleErrors(response)
}

export const createSettings = async (
  input: SettingsInput,
): Promise<SettingsModel> => {
  const response = await post<SettingsModel>({
    url: 'settings',
    data: {...input},
  })

  return handleErrors(response)
}

export const updateSettings = async (
  id: string,
  input: SettingsInput,
): Promise<SettingsModel> => {
  const response = await put<SettingsModel>({
    url: `settings/${id}`,
    data: {...input},
  })

  return handleErrors(response)
}

export const findOrCreateUser = async ({
  profileObj,
}: GoogleLoginResponse): Promise<User> => {
  const response = await post<User>({
    url: 'auth',
    data: {
      user: {
        email: profileObj.email,
        firstName: profileObj.givenName,
        lastName: profileObj.familyName,
        googleId: profileObj.googleId,
      },
    },
  })

  return handleErrors(response)
}
