import { Layout } from '../../components/Layout';
import {
  Table,
  TableCell,
  TableColumn,
  TableRow,
  TableBody,
  TableHeader,
  getKeyValue,
} from '@heroui/react';
import { useListPatientsQuery } from '../../api/hooks';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import { PatientType } from '../../api/types';
import { PatientDetail } from './PatientDetail';
import { PatientStatusChip } from '../../components/PatientStatusChip';

const columns = [
  {
    key: 'fullName',
    label: 'NAME',
  },
  {
    key: 'age',
    label: 'AGE',
  },
  {
    key: 'city',
    label: 'CITY',
  },
  {
    key: 'status',
    label: 'STATUS',
  },
];

export function Dashboard() {
  const [selectedPatientId, setSelectedPatientId] = useState<PatientType["id"] | null>(null);
  const listPatients = useListPatientsQuery({});

  // Mutate data into table form
  const rows = useMemo(() => {
    return (listPatients.data?.data ?? []).map((patient) => ({
      key: patient.id,
      fullName: <span className="text-black font-bold">
        {[
          patient.firstName,
          patient.middleName ? `${patient.middleName?.charAt(0)}.` : '',
          patient.lastName,
        ].join(' ')}
      </span>,
      age: dayjs().diff(dayjs(patient.dateOfBirth), 'year'),
      status: <PatientStatusChip patient={patient} />,
      city: (
        <span>
          <span className="text-black">
            {[patient.address.city, patient.address.state].join(', ')}
          </span>{' '}
          <span className="text-natural-black/50">
            {' '}
            {patient.address.country}
          </span>
        </span>
      ),
    }));
  }, [listPatients.data]);

  return (
    <>
      <Layout>
        <Table
          selectionMode={'single'}
          color="primary"
          classNames={{ th: 'bg-black text-white' }}
          aria-label="Patient table"
          onSelectionChange={(keys) => {
            const selection = String(Array.from(keys)[0]);
            if (selection) {
              setSelectedPatientId(selection)
            } else {
              setSelectedPatientId(null)
            }
          }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Layout>
      <PatientDetail patientId={selectedPatientId} setPatientId={setSelectedPatientId}/>
    </>
  );
}
