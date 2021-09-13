import { v1 as uuid } from 'uuid';
import {
  NewPatient,
  NonSensetivePatient,
  Patient,
  PublicPatient,
} from '../types';

import rawPatients from '../../data/patients.json';
const patients = rawPatients as Patient[];

const filterSSN = (patient: Patient): NonSensetivePatient => {
  const { ssn, ...withoutSSN } = patient; // eslint-disable-line @typescript-eslint/no-unused-vars
  return withoutSSN;
};
const getEntries = (): NonSensetivePatient[] => patients.map(filterSSN); // eslint-disable-line @typescript-eslint/no-unused-vars

const findById = (id: string): PublicPatient | undefined => {
  return patients.find((p) => p.id === id);
};

const addEntry = (entry: NewPatient): NonSensetivePatient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatient);
  const withoutSSN = filterSSN(newPatient);
  return withoutSSN;
};
export default { addEntry, getEntries, findById };
