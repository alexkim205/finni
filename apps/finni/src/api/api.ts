import {CLIENT_URL} from "../helpers/constants";
import {AgeRangeType, PatientType, ProviderType, StatusType} from "./types";
import {objectToUrlParams} from "../helpers/utils";

export interface GetPatientsRequest {
  filters?: Partial<{
    name: string;
    ageRange: AgeRangeType;
    state: string;
    exUnitedStates: boolean; // outside of US
    status: StatusType
  }>
}

export interface GetPatientRequest {
  patientId: PatientType["id"];
}

export async function getPatients({filters}: GetPatientsRequest): Promise<PatientType[]> {
  const searchParams = new URLSearchParams(objectToUrlParams(filters ?? {}));
  const response = await fetch(
    `${CLIENT_URL}/patients?${searchParams.toString()}`,
  )
  if (!response.ok) {
    throw new Error('There was an error fetching patients')
  }
  return await response.json()
}

export async function getPatient({patientId}: GetPatientRequest): Promise<PatientType> {
  const response = await fetch(
    `${CLIENT_URL}/patients/${patientId}`,
  )
  if (!response.ok) {
    throw new Error(`There was an error fetching patient: ${patientId}`)
  }
  return await response.json()
}

export async function getMe(): Promise<ProviderType> {
  const response = await fetch(
    `${CLIENT_URL}/me`,
  )
  if (!response.ok) {
    throw new Error('There was an error fetching current user')
  }
  return await response.json()
}
