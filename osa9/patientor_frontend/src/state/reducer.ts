import { State } from './state';
import { Diagnosis, Patient } from '../types';

export const setPatientList = (payload: Patient[]): SET_PATIENT_LIST_ACTION => {
  return {
    type: 'SET_PATIENT_LIST',
    payload,
  };
};

export const setPatient = (payload: Patient): SET_PATIENT_ACTION => {
  return {
    type: 'SET_PATIENT',
    payload,
  };
};

export const addPatient = (payload: Patient): ADD_PATIENT_ACTION => {
  return {
    type: 'ADD_PATIENT',
    payload,
  };
};

export const setDiagnosisList = (
  payload: Diagnosis[]
): SET_DIAGNOSIS_LIST_ACTION => {
  return {
    type: 'SET_DIAGNOSIS_LIST',
    payload,
  };
};

export type Action =
  | SET_PATIENT_LIST_ACTION
  | SET_PATIENT_ACTION
  | ADD_PATIENT_ACTION
  | SET_DIAGNOSIS_LIST_ACTION;

type SET_PATIENT_LIST_ACTION = {
  type: 'SET_PATIENT_LIST';
  payload: Patient[];
};

type SET_DIAGNOSIS_LIST_ACTION = {
  type: 'SET_DIAGNOSIS_LIST';
  payload: Diagnosis[];
};

type SET_PATIENT_ACTION = {
  type: 'SET_PATIENT';
  payload: Patient | null;
};

type ADD_PATIENT_ACTION = {
  type: 'ADD_PATIENT';
  payload: Patient;
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'SET_DIAGNOSIS_LIST':
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnosis,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_PATIENT':
      return {
        ...state,
        patient: action.payload,
      };
    default:
      return state;
  }
};
