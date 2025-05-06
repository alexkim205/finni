import { SERVER_URL } from '../helpers/constants';
import {
  GetPatientRequest, GetPatientResponse,
  GetPatientsRequest,
  GetPatientsResponse,
  ProviderType,
  ResponseMixin,
} from './types';
import {objectToUrlParams} from "../helpers/utils";

export async function getPatients({filters}: GetPatientsRequest): Promise<GetPatientsResponse> {
  const searchParams = new URLSearchParams(objectToUrlParams(filters ?? {}));
  const response = await fetch(
    `${SERVER_URL}/patients?${searchParams.toString()}`,
  )
  if (!response.ok) {
    throw new Error('There was an error fetching patients')
  }
  return (await response.json()).patients
}

export async function getPatient({patientId}: GetPatientRequest): Promise<GetPatientResponse> {
  const response = await fetch(
    `${SERVER_URL}/patients/${patientId}`,
  )
  if (!response.ok) {
    throw new Error(`There was an error fetching patient: ${patientId}`)
  }
  return (await response.json()).patient
}

export async function getMe(): Promise<ProviderType> {
  const response = await fetch(
    `${SERVER_URL}/me`,
  )
  if (!response.ok) {
    throw new Error('There was an error fetching current user')
  }
  return (await response.json()).data
}

export interface LoginRequest {
  email: string;
  password: string;
}

export async function login(props: LoginRequest): Promise<ProviderType> {
  const response = await fetch(
    `${SERVER_URL}/login`,
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
    `${SERVER_URL}/logout`,
    {
      method: 'POST',
    },
  )
  if (!response.ok) {
    throw new Error('There was an error logging out')
  }
  return await response.json()
}
