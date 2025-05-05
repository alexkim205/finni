import {queryOptions, useQuery, UseQueryOptions} from "@tanstack/react-query";
import {getMe, getPatient, GetPatientRequest, getPatients, GetPatientsRequest} from "./api";
import {PatientType, ProviderType} from "./types";

function usePatients(props: GetPatientsRequest, options?: UseQueryOptions<PatientType[], Error>) {
  return useQuery<PatientType[], Error>({
    queryKey: ['patients', props],
    queryFn: (): Promise<PatientType[]> => getPatients(props),
    ...options,
  });
}

function usePatient(props: GetPatientRequest, options?: UseQueryOptions<PatientType, Error>) {
  return queryOptions({
    queryKey: ["patients", props],
    queryFn: (): Promise<PatientType> => getPatient(props),
    ...options
  })
}

function useMe(options?: UseQueryOptions<ProviderType, Error>) {
  return queryOptions({
    queryKey: ["me"],
    queryFn: (): Promise<ProviderType> => getMe(),
    ...options
  })
}

