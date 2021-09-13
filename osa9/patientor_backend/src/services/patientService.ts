import { v1 as uuid } from 'uuid';
import {
  NewPatientEntry,
  NonSensetivePatientEntry,
  PatientEntry,
} from '../types';
import rawPatients from '../../data/patients.json';

const patients = rawPatients as PatientEntry[];
const getEntries = (): NonSensetivePatientEntry[] =>
  patients.map(({ ssn, ...withoutSSN }) => withoutSSN); // eslint-disable-line @typescript-eslint/no-unused-vars

const addEntry = (entry: NewPatientEntry): NonSensetivePatientEntry => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatient);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ssn, ...withoutSSN } = newPatient;
  return withoutSSN;
};
export default { addEntry, getEntries };
