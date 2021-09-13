import { isGender, isString } from './typeGuards';
import { Gender, NewPatient } from './types';

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
}: PatientFields): NewPatient => {
  return {
    name: parseStringParam(name, 'name'),
    dateOfBirth: parseDateParam(dateOfBirth, 'date of birth'),
    ssn: parseStringParam(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseStringParam(occupation, 'occupation'),
    entries: [],
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

const parseGender = (gender: unknown): Gender => {
  if (!gender || !parseStringParam(gender, 'gender') || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};
