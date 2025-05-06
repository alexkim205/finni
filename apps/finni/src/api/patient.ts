import { SERVER_URL } from '../helpers/constants';
import {
  CreatePatientRequest, DeletePatientRequest,
  GetPatientRequest, GetPatientResponse,
  GetPatientsRequest,
  GetPatientsResponse, ResponseMixin, UpdatePatientRequest
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
  return await response.json()
}

export async function getPatient({patientId}: GetPatientRequest): Promise<GetPatientResponse> {
  if (!patientId) {
    return {}
  }
  const response = await fetch(
    `${SERVER_URL}/patients/${patientId}`,
  )
  if (!response.ok) {
    throw new Error(`There was an error fetching patient: ${patientId}`)
  }
  return (await response.json()).data
}

export async function createPatient(props: CreatePatientRequest): Promise<GetPatientResponse> {
  const response = await fetch(
    `${SERVER_URL}/patients`,
    {
      method: "POST",
      body: JSON.stringify(props),
    }
  )
  if (!response.ok) {
    throw new Error(`There was an error creating patient.`)
  }
  return (await response.json()).data
}

export async function updatePatient(props: UpdatePatientRequest): Promise<GetPatientResponse> {
  const response = await fetch(
    `${SERVER_URL}/patients`,
    {
      method: "PUT",
      body: JSON.stringify(props),
    }
  )
  if (!response.ok) {
    throw new Error(`There was an error updating patient.`)
  }
  return (await response.json()).data
}

export async function deletePatient({patientId}: DeletePatientRequest): Promise<ResponseMixin> {
  const response = await fetch(
    `${SERVER_URL}/patients/${patientId}`,
    {
      method:"DELETE"
    }
  )
  if (!response.ok) {
    throw new Error(`There was an error deleting patient: ${patientId}`)
  }
  return await response.json()
}
