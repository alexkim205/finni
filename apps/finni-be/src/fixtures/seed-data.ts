import dayjs from "dayjs";
import { faker } from "@faker-js/faker";
import { StatusType } from '../types';

function generateRandomPatient(id: number) {
  const firstName = faker.person.firstName();
  const middleName = faker.person.middleName();
  const lastName = faker.person.lastName();
  const dateOfBirth = dayjs(faker.date.birthdate({ min: 18, max: 85, mode: 'age' }));
  const status = faker.helpers.arrayElement(Object.values(StatusType));
  const address = {
    line1: faker.location.streetAddress(),
    line2: faker.datatype.boolean() ? faker.location.secondaryAddress() : "",
    city: faker.location.city(),
    state: faker.location.state(),
    country: "USA",
    zip: faker.location.zipCode(),
  };

  return {
    id,
    firstName,
    middleName,
    lastName,
    dateOfBirth,
    status,
    address
  };
}

export const patients = Array.from({ length: 50 }, (_, i) => generateRandomPatient(i + 1));
