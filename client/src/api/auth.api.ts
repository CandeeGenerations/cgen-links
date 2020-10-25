import {GoogleLoginResponse} from 'react-google-login'

import {User} from '../models'
import {get, handleErrors, post} from './index'

export const findUserById = async (id: string): Promise<User> => {
  const response = await get<User>({
    url: `auth/id/${id}`,
  })

  return handleErrors(response)
}

export const findAuthorizedUser = async (googleId: string): Promise<User> => {
  const response = await get<User>({
    url: `auth/${googleId}`,
  })

  return handleErrors(response)
}

export const findOrCreateUser = async ({
  profileObj,
}: GoogleLoginResponse): Promise<User> => {
  const response = await post<User>({
    url: 'auth',
    data: {
      email: profileObj.email,
      firstName: profileObj.givenName,
      lastName: profileObj.familyName,
      googleId: profileObj.googleId,
    },
  })

  return handleErrors(response)
}
