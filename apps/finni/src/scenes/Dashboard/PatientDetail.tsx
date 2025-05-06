import { Map, Marker } from 'pigeon-maps';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Skeleton,
} from '@heroui/react';
import { PatientType } from '../../api/types';
import { useDeletePatientQuery, useGetPatientQuery } from '../../api/hooks';
import dayjs from 'dayjs';
import { PatientStatusChip } from '../../components/PatientStatusChip';
import { FaTrash } from 'react-icons/fa6';
import { useQueryClient } from '@tanstack/react-query';

export interface PatientDetailProps {
  patientId: PatientType['id'] | null;
  setPatientId: (patientId: PatientType['id'] | null) => void;
}

export function PatientDetail({ patientId, setPatientId }: PatientDetailProps) {
  const { data, isFetching } = useGetPatientQuery({ patientId });
  const queryClient = useQueryClient();
  const deletePatient = useDeletePatientQuery({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients', {}] }); // TODO: get actual query key here
    },
  });

  async function onDeletePatient() {
    await deletePatient.mutateAsync({ patientId });
  }

  return data ? (
    <Drawer
      isOpen={!!patientId}
      onClose={() => setPatientId(null)}
      size={'3xl'}
    >
      <DrawerContent className="p-8 flex flex-col">
        {() => (
          <>
            <Skeleton isLoaded={!isFetching}>
              <DrawerHeader className="flex flex-col gap-1 text-3xl text-black">
                {data
                  ? [data.firstName, data.middleName, data.lastName].join(' ')
                  : '<Empty string>'}
              </DrawerHeader>
            </Skeleton>
            <Skeleton isLoaded={!isFetching}>
              <DrawerBody className="flex-grow">
                <div className="grid grid-cols-4 gap-1">
                  <div className="font-bold col-span-1">Date of birth</div>
                  <div className="col-span-3">
                    {dayjs(data?.dateOfBirth).format('MM/DD/YYYY')} (
                    {dayjs().diff(dayjs(data?.dateOfBirth), 'year')} years)
                  </div>
                  <div className="font-bold col-span-1">Address</div>
                  <div className="col-span-3">
                    {[data?.address?.line1, data?.address?.line2].join(' ')}{' '}
                    <br />
                    {[data?.address?.city, data?.address?.state].join(
                      ', '
                    )}{' '}
                    {data?.address?.country} {data?.address?.zip}
                  </div>
                  <div className="font-bold col-span-1">Status</div>
                  <div className="col-span-3">
                    <PatientStatusChip patient={data as PatientType} />
                  </div>
                </div>

                <div className="rounded-lg overflow-hidden mt-8">
                  <Map
                    height={300}
                    defaultCenter={[50.879, 4.6997]}
                    defaultZoom={11}
                  >
                    <Marker width={50} anchor={[50.879, 4.6997]} />
                  </Map>
                </div>
              </DrawerBody>
            </Skeleton>
            <DrawerFooter>
              <Button
                color="danger"
                className="text-white font-bold"
                radius="sm"
                onPress={onDeletePatient}
              >
                <FaTrash size={16} /> Delete Patient
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  ) : (
    <></>
  );
}
