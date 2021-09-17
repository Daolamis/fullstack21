import { NewEntry } from '../types';
import { isValidDateString, isValidHealtCheckRating } from '../util';

interface InternalValues {
  type: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes: string[];
  //HealthCheck
  healthCheckRating: number;
  //OccupationalHealthcare
  employerName: string;
  sickleaveStartDate: string;
  sickleaveEndDate: string;
  //Hospital
  dischargeDate: string;
  dischargeCriteria: string;
}

export const convertValuesToNewEntry = (values: InternalValues): NewEntry => {
  const {
    healthCheckRating,
    employerName,
    sickleaveEndDate,
    sickleaveStartDate,
    dischargeCriteria,
    dischargeDate,
    ...baseType
  } = values;
  if (baseType.type === 'Hospital') {
    return {
      ...baseType,
      type: 'Hospital', // making typescript happy
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria,
      },
    };
  }
  if (baseType.type === 'HealthCheck') {
    return {
      ...baseType,
      type: 'HealthCheck', // making typescript happy
      healthCheckRating,
    };
  }
  if (baseType.type === 'OccupationalHealthcare') {
    const sickLeave =
      sickleaveStartDate && sickleaveEndDate
        ? {
            startDate: sickleaveStartDate,
            endDate: sickleaveEndDate,
          }
        : undefined;
    return {
      ...baseType,
      type: 'OccupationalHealthcare', // making typescript happy
      employerName,
      sickLeave,
    };
  }
  throw new Error('unkown health type');
};

type ValidationError = { [P in keyof InternalValues]?: string };

export const validateForm = (values: InternalValues): ValidationError => {
  console.log('healh', values.type);

  const requiredError = 'Field is required';
  const invalidDateError = 'Field is not valid date';
  const errors: ValidationError = {};

  //Base entry
  if (!values.date) {
    errors.date = requiredError;
  } else if (!isValidDateString(values.date)) {
    errors.date = invalidDateError;
  }
  if (!values.specialist) {
    errors.specialist = requiredError;
  }
  if (!values.description) {
    errors.description = requiredError;
  }

  if (values.type === 'HealthCheck') {
    if (!values.healthCheckRating) {
      errors.healthCheckRating = requiredError;
    } else if (!isValidHealtCheckRating(values.healthCheckRating)) {
      errors.healthCheckRating = 'Invalid value for Healt check rating';
    }
  }

  if (values.type === 'OccupationalHealthcare') {
    if (!values.employerName) {
      errors.employerName = requiredError;
    }
    if (values.sickleaveStartDate || values.sickleaveEndDate) {
      if (!values.sickleaveStartDate) {
        errors.sickleaveStartDate = requiredError;
      } else if (!isValidDateString(values.sickleaveStartDate)) {
        errors.sickleaveStartDate = invalidDateError;
      }

      if (!values.sickleaveEndDate) {
        errors.sickleaveEndDate = requiredError;
      } else if (!isValidDateString(values.sickleaveEndDate)) {
        errors.sickleaveEndDate = invalidDateError;
      }
    }
  }

  if (values.type === 'Hospital') {
    if (!values.dischargeCriteria) {
      errors.dischargeCriteria = requiredError;
    }
    if (!values.dischargeDate) {
      errors.dischargeDate = requiredError;
    } else if (!isValidDateString(values.dischargeDate)) {
      errors.dischargeDate = invalidDateError;
    }
  }

  return errors;
};
