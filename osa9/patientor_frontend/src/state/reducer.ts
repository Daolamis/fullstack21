import { State } from './state';
import { Diagnosis, Entry, Patient } from '../types';

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

export const addEntry = (payload: Entry): ADD_ENTRY_ACTION => {
  return {
    type: 'ADD_ENTRY',
    payload,
  };
};

export type Action =
  | SET_PATIENT_LIST_ACTION
  | SET_PATIENT_ACTION
  | ADD_PATIENT_ACTION
  | SET_DIAGNOSIS_LIST_ACTION
  | ADD_ENTRY_ACTION;

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

type ADD_ENTRY_ACTION = {
  type: 'ADD_ENTRY';
  payload: Entry;
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
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses,
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
    case 'ADD_ENTRY':
      // there must be a patient, because entry is added from Patient -page
      const patient = { ...(state.patient as Patient) };
      patient.entries.push(action.payload);

      return {
        ...state,
        patient: patient,
        patients: {
          ...state.patients,
          [patient.id]: patient,
        },
      };

    default:
      return state;
  }
};
