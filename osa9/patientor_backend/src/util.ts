import {
  isGender,
  isHealthCheckRating,
  isNumber,
  isString,
  isStringArray,
} from './typeGuards';
import {
  Entry,
  Gender,
  HealthCheckRating,
  HospitalEntry,
  NewEntry,
  NewPatient,
  OccupationalHealthCareEntry,
} from './types';

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

type EntryFields = {
  type: unknown;
  id: unknown;
  date: unknown;
  specialist: unknown;
  description: unknown;
  diagnosisCodes?: unknown;
  healthCheckRating: unknown;
  employerName: unknown;
  sickLeave: unknown;
  discharge: unknown;
};

export const toNewEntry = ({
  type,
  date,
  specialist,
  description,
  diagnosisCodes,
  healthCheckRating,
  employerName,
  sickLeave,
  discharge,
}: EntryFields): NewEntry => {
  const baseEntry = {
    date: parseDateParam(date, 'date'),
    specialist: parseStringParam(specialist, 'specialist'),
    description: parseStringParam(description, 'description'),
    diagnosisCodes: parseDiagnosticCodes(diagnosisCodes),
  };
  const parsedType = parseStringParam(type, 'type');
  switch (parsedType) {
    case 'HealthCheck':
      return {
        ...baseEntry,
        type: parsedType,
        healthCheckRating: parseHealtCheckRating(healthCheckRating),
      };
    case 'OccupationalHealthcare':
      return {
        ...baseEntry,
        type: parsedType,
        employerName: parseStringParam(employerName, 'employerName'),
        sickLeave: parseSickLeave(sickLeave),
      };
    case 'Hospital':
      return {
        ...baseEntry,
        type: parsedType,
        discharge: parseDischarge(discharge),
      };

    default:
      throw new Error('Unknown health type:' + parsedType);
  }
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

const parseNumberParam = (value: unknown, nameOfParam: string): number => {
  if (!value || !isNumber(value)) {
    throw new Error(`Incorrect or missing ${nameOfParam}: ${value}`);
  }
  return value;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !parseStringParam(gender, 'gender') || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  }
  return gender;
};

const parseHealtCheckRating = (rating: unknown): HealthCheckRating => {
  if (
    !rating ||
    !parseNumberParam(rating, 'HealthCheckRating') ||
    !isHealthCheckRating(rating)
  ) {
    throw new Error(`Incorrect or missing gender: ${rating}`);
  }
  return rating;
};

const parseDiagnosticCodes = (codes: unknown): Entry['diagnosisCodes'] => {
  if (!codes) {
    return undefined;
  }
  if (!isStringArray(codes)) {
    throw new Error('incorrect format: diagnosticCodes');
  }
  return codes;
};

const parseSickLeave = (
  sickLeave: any // eslint-disable-line @typescript-eslint/no-explicit-any
): OccupationalHealthCareEntry['sickLeave'] => {
  if (!sickLeave) {
    return undefined;
  }

  console.log('SICKleave', sickLeave);

  return {
    startDate: parseStringParam(sickLeave.startDate, 'sick leave start date'),
    endDate: parseStringParam(sickLeave.endDate, 'sick leave end date'),
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge = (discharge: any): HospitalEntry['discharge'] => {
  if (!discharge) {
    throw new Error('Incorrect or missing discharge');
  }

  return {
    date: parseDateParam(discharge.date, 'discharge date'),
    criteria: parseStringParam(discharge.criteria, 'discharge criteria'),
  };
};
