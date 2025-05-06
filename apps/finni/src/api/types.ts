export enum StatusType {
  Inquiry = "inquiry",
  Onboarding = "onboarding",
  Active = "active",
  Churned = "churned",
}

export enum AgeRangeType {
  Age_0_10 = "0-10",
  Age_11_25 = "11-25",
  Age_26_40 = "26-40",
  Age_41_60 = "41-60",
  Age_61_80 = "61-80",
  Age_81_Plus = "81+"
}

export interface PatientType {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  status: StatusType
  address: {
    line1: string;
    line2: string;
    city: string; // filterable
    state: string; // filterable
    country: string; // filterable
    zip: string;
  }
}

export interface ProviderType {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ResponseMixin {
  ok: boolean;
}

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

export interface GetPatientsResponse extends GetPatientsRequest, ResponseMixin {
  patients: PatientType[]
}

export interface GetPatientResponse extends ResponseMixin {
  patient: PatientType
}

export type CreatePatientRequest = Omit<PatientType, "id">

export type UpdatePatientRequest = Partial<CreatePatientRequest>

export type DeletePatientRequest = GetPatientRequest
