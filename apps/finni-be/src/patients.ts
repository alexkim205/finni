import express from 'express';
import dayjs from 'dayjs';
import { StatusType } from './types';
import { patients } from './fixtures/seed-data';

const router = express.Router()

// Mock patients
const patient = {
  id: 1,
  firstName: "Elizabeth",
  middleName: "S",
  lastName: "Kim",
  dateOfBirth: dayjs("1998-04-13"),
  status: StatusType.Active,
  address: {
    line1: "123 4th Ave",
    line2: "",
    city: "New York City",
    state: "NY",
    country: "USA",
    zip: "11232",
  }
}

// Get
router.get('/:id', (req, res) => {
  res.json({
    ok: true,
    data: patient
  });
});

// List
router.get('/', (req, res) => {
  res.json({
    ok: true,
    data: patients
  });
});


// Create
router.post('/', (req, res) => {
  res.json({
    ok: true,
    data: patient
  });
});

// Update
router.put('/:id', (req, res) => {
  res.json({
    ok: true,
    data: patient
  });
});

// Update
router.delete('/:id', (req, res) => {
  res.json({
    ok: true,
  });
});


export default router
