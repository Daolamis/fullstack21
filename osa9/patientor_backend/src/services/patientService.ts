import { v1 as uuid } from 'uuid';
import patients from '../../data/patients';
import {
  Entry,
  NewEntry,
  NewPatient,
  NonSensetivePatient,
  Patient,
  PublicPatient,
} from '../types';

const filterSSN = (patient: Patient): NonSensetivePatient => {
  const { ssn, ...withoutSSN } = patient; // eslint-disable-line @typescript-eslint/no-unused-vars
  return withoutSSN;
};
const getAll = (): NonSensetivePatient[] => patients.map(filterSSN);

const findById = (id: string): PublicPatient | undefined => {
  return patients.find((p) => p.id === id);
};

const create = (patient: NewPatient): NonSensetivePatient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatient);
  const withoutSSN = filterSSN(newPatient);
  return withoutSSN;
};

const createEntry = (patientId: string, entry: NewEntry): Entry => {
  const patient = patients.find((p) => p.id === patientId);
  if (!patient) {
    throw new Error('Patient not found');
  }
  const newEntry = {
    id: uuid(),
    ...entry,
  } as Entry;

  patient.entries.push(newEntry);
  return newEntry;
};

export default { create, createEntry, getAll, findById };
