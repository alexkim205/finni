import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getMe, getPatient, GetPatientRequest, getPatients, GetPatientsRequest, login, LoginRequest } from './api';
import {PatientType, ProviderType} from "./types";

export function usePatientsQuery(props: GetPatientsRequest, options?: UseQueryOptions<PatientType[], Error>) {
  return useQuery<PatientType[], Error>({
    queryKey: ['patients', props],
    queryFn: (): Promise<PatientType[]> => getPatients(props),
    ...options,
  });
}

export function usePatientQuery(props: GetPatientRequest, options?: UseQueryOptions<PatientType, Error>) {
  return useQuery<PatientType, Error>({
    queryKey: ["patients", props],
    queryFn: (): Promise<PatientType> => getPatient(props),
    ...options
  })
}

export function useMeQuery(options?: UseQueryOptions<ProviderType, Error>) {
  return useQuery<ProviderType, Error>({
    queryKey: ["me"],
    queryFn: (): Promise<ProviderType> => getMe(),
    ...options
  })
}

export function useLoginMutation(options?: UseMutationOptions<ProviderType, Error, LoginRequest>) {
  return useMutation<ProviderType, Error, LoginRequest>({
    mutationFn: (data: LoginRequest): Promise<ProviderType> => login(data),
    ...options,
  })
}
