import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  getMe,
  getPatient,
  GetPatientRequest, GetPatientResponse,
  getPatients,
  GetPatientsRequest, GetPatientsResponse,
  login,
  LoginRequest,
  logout
} from './api';
import { ProviderType, ResponseMixin } from './types';

export function usePatientsQuery(props: GetPatientsRequest, options?: UseQueryOptions<GetPatientsResponse, Error>) {
  return useQuery<GetPatientsResponse, Error>({
    queryKey: ['patients', props],
    queryFn: () => getPatients(props),
    ...options,
  });
}

export function usePatientQuery(props: GetPatientRequest, options?: UseQueryOptions<GetPatientResponse, Error>) {
  return useQuery<GetPatientResponse, Error>({
    queryKey: ["patients", props],
    queryFn: () => getPatient(props),
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

export function useLogoutMutation(options?: UseMutationOptions<ResponseMixin, Error>) {
  return useMutation<ResponseMixin, Error>({
    mutationFn: (): Promise<ResponseMixin> => logout(),
    ...options,
  })
}
