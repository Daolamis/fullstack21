import { v1 as uuid } from 'uuid';
import {
  NewPatient,
  NonSensetivePatient,
  Patient,
  PublicPatient,
} from '../types';

import patients from '../../data/patients';

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

export default { create, getAll, findById };
