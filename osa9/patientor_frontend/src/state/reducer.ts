import { State } from './state';
import { Patient } from '../types';

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

export type Action =
  | SET_PATIENT_LIST_ACTION
  | SET_PATIENT_ACTION
  | ADD_PATIENT_ACTION;

type SET_PATIENT_LIST_ACTION = {
  type: 'SET_PATIENT_LIST';
  payload: Patient[];
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
