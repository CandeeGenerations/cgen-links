import {Click, ClickPage} from '../models'
import {get, handleErrors, post} from './index'

export const createClick = async (input: Click): Promise<Click> => {
  const response = await post<Click>({url: 'click', data: {...input}})

  return handleErrors(response)
}

export const findAllClicksByOwner = async (
  owner: string,
): Promise<ClickPage> => {
  const response = await get<ClickPage>({url: `click/${owner}`})

  return handleErrors(response)
}
