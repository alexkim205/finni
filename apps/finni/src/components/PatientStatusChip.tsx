import { PatientType, StatusType } from '../api/types';
import { Chip, ChipProps } from '@heroui/react';
import { clsx } from 'clsx';

export function PatientStatusChip({ patient }: { patient: Pick<PatientType, "status"> }) {
  return (
    <Chip
      color={
        {
          [StatusType.Inquiry]: 'default',
          [StatusType.Onboarding]: 'warning',
          [StatusType.Active]: 'success',
          [StatusType.Churned]: 'danger',
        }[patient.status] as ChipProps['color']
      }
      classNames={{
        content: clsx(
          'font-bold',
          {
            [StatusType.Inquiry]: 'default',
            [StatusType.Onboarding]: 'warning',
            [StatusType.Active]: 'success',
            [StatusType.Churned]: 'text-white',
          }[patient.status]
        ),
      }}
    >
      {patient.status}
    </Chip>
  )
}
