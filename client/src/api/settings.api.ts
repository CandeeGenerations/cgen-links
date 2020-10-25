import {handleErrors, post, put} from './index'
import {Settings, SettingsInput} from '../models'

export const createSettings = async (
  input: SettingsInput,
): Promise<Settings> => {
  const response = await post<Settings>({
    url: 'settings',
    data: {...input},
  })

  return handleErrors(response)
}

export const updateSettings = async (
  id: string,
  input: SettingsInput,
): Promise<Settings> => {
  const response = await put<Settings>({
    url: `settings/${id}`,
    data: {...input},
  })

  return handleErrors(response)
}
