import { SERVER_URL } from '../helpers/constants';
import {
  LoginRequest,
  ProviderType,
  ResponseMixin
} from './types';

export async function getMe(): Promise<ProviderType> {
  const response = await fetch(
    `${SERVER_URL}/auth/me`,
  )
  if (!response.ok) {
    throw new Error('There was an error fetching current user')
  }
  return (await response.json()).data
}

export async function login(props: LoginRequest): Promise<ProviderType> {
  const response = await fetch(
    `${SERVER_URL}/auth/login`,
    {
      method: 'POST',
      body: JSON.stringify(props)
    },
  )
  if (!response.ok) {
    throw new Error('There was an error logging in')
  }
  return (await response.json()).data
}

export async function logout(): Promise<ResponseMixin> {
  const response = await fetch(
    `${SERVER_URL}/auth/logout`,
    {
      method: 'POST',
    },
  )
  if (!response.ok) {
    throw new Error('There was an error logging out')
  }
  return await response.json()
}
