import {get, handleErrors, post, put} from './index'
import {Settings, SettingsInput} from '../models'

export const findSettingsBySlug = async (slug: string): Promise<Settings> => {
  const response = await get<Settings>({
    url: `settings/public/${slug}`,
  })

  return handleErrors(response)
}

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
