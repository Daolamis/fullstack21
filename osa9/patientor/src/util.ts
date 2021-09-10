import { isString } from './typeGuards';
import { NewPatientEntry } from './types';

type PatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};
export const toNewPatientEntry = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: PatientFields): NewPatientEntry => {
  return {
    name: parseStringParam(name, 'name'),
    dateOfBirth: parseDateParam(dateOfBirth, 'date of birth'),
    ssn: parseStringParam(ssn, 'ssn'),
    gender: parseStringParam(gender, 'gender'),
    occupation: parseStringParam(occupation, 'occupation'),
  };
};

const parseStringParam = (param: unknown, nameOfParam: string): string => {
  if (!param || !isString(param)) {
    throw new Error(`Incorrect or missing ${nameOfParam}: ${param}`);
  }
  return param;
};

const parseDateParam = (date: unknown, nameOfParam: string): string => {
  const parsedStr = parseStringParam(date, nameOfParam);
  if (!Date.parse(parsedStr)) {
    throw new Error(`Incorrect or missing ${nameOfParam}: ${date}`);
  }
  return parsedStr;
};
