import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions
} from '@tanstack/react-query';
import { login, getMe, logout } from './user';
import { createPatient, deletePatient, getPatient, getPatients, updatePatient } from './patient';
import {
  ProviderType,
  ResponseMixin,
  LoginRequest,
  GetPatientsRequest,
  GetPatientsResponse,
  GetPatientRequest,
  GetPatientResponse, CreatePatientRequest, UpdatePatientRequest, DeletePatientRequest
} from './types';

export function useListPatientsQuery(
  props: GetPatientsRequest,
  options?: UseQueryOptions<GetPatientsResponse, Error>
) {
  return useQuery<GetPatientsResponse, Error>({
    queryKey: ['patients', props],
    queryFn: () => getPatients(props),
    ...options,
  });
}

export function useGetPatientQuery(
  props: GetPatientRequest,
  options?: UseQueryOptions<GetPatientResponse, Error>
) {
  return useQuery<GetPatientResponse, Error>({
    queryKey: ['patients', props],
    queryFn: () => getPatient(props),
    ...options,
  });
}

export function useCreatePatientQuery(
  options?: UseMutationOptions<GetPatientResponse, Error, CreatePatientRequest>
) {
  return useMutation<GetPatientResponse, Error, CreatePatientRequest>({
    mutationFn: (props: CreatePatientRequest) => createPatient(props),
    ...options,
  });
}

export function useUpdatePatientQuery(
  options?: UseMutationOptions<GetPatientResponse, Error, UpdatePatientRequest>
) {
  return useMutation<GetPatientResponse, Error, UpdatePatientRequest>({
    mutationFn: (props: UpdatePatientRequest) => updatePatient(props),
    ...options,
  });
}

export function useDeletePatientQuery(
  options?: UseMutationOptions<ResponseMixin, Error, DeletePatientRequest>
) {
  return useMutation<ResponseMixin, Error, DeletePatientRequest>({
    mutationFn: (props: DeletePatientRequest) => deletePatient(props),
    ...options,
  });
}

export function useMeQuery(options?: UseQueryOptions<ProviderType, Error>) {
  return useQuery<ProviderType, Error>({
    queryKey: ['me'],
    queryFn: (): Promise<ProviderType> => getMe(),
    ...options,
  });
}

export function useLoginMutation(
  options?: UseMutationOptions<ProviderType, Error, LoginRequest>
) {
  return useMutation<ProviderType, Error, LoginRequest>({
    mutationFn: (data: LoginRequest): Promise<ProviderType> => login(data),
    ...options,
  });
}

export function useLogoutMutation(
  options?: UseMutationOptions<ResponseMixin, Error>
) {
  return useMutation<ResponseMixin, Error>({
    mutationFn: (): Promise<ResponseMixin> => logout(),
    ...options,
  });
}
