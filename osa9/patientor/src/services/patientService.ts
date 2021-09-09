import patients from '../../data/patients.json';
import { NonSensetivePatientEntry } from '../types';

const getEntries = (): NonSensetivePatientEntry[] =>
  patients.map(({ ssn, ...rest }) => rest); // eslint-disable-line @typescript-eslint/no-unused-vars

export default { getEntries };
