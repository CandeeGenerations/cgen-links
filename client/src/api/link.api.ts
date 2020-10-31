import {Link, LinkInput} from '../models'
import {get, handleErrors, post, put} from './index'
import {LinkPageModel} from '../models/link.model'

export const findLinkById = async (id: string): Promise<Link> => {
  const response = await get<Link>({url: `link/id/${id}`})

  return handleErrors(response)
}

export const findLinksByOwner = async (
  owner: string,
): Promise<LinkPageModel> => {
  const response = await get<LinkPageModel>({url: `link/${owner}`})

  return handleErrors(response)
}

export const findActiveLinksByOwner = async (
  owner: string,
): Promise<LinkPageModel> => {
  const response = await get<LinkPageModel>({url: `link/public/${owner}`})

  return handleErrors(response)
}

export const createLink = async (input: LinkInput): Promise<Link> => {
  const response = await post<Link>({url: 'link', data: {...input}})

  return handleErrors(response)
}

export const updateLink = async (
  id: string,
  input: LinkInput,
): Promise<Link> => {
  const response = await put<Link>({
    url: `link/${id}`,
    data: {...input},
  })

  return handleErrors(response)
}

export const toggleActiveLink = async (
  id: string,
  active: boolean,
): Promise<Link> => {
  const response = await post<Link>({
    url: `link/${id}/toggle-active?active=${active}`,
  })

  return handleErrors(response)
}

export const deleteLink = async (id: string): Promise<Link> => {
  const response = await post<Link>({
    url: `link/${id}/delete`,
  })

  return handleErrors(response)
}

export const reorderLinks = async (
  ids: string[],
  owner: string,
): Promise<LinkPageModel> => {
  const response = await post<LinkPageModel>({
    url: 'link/reorder',
    data: {ids, owner},
  })

  return handleErrors(response)
}
