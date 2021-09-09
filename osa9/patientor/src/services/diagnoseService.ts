import { DiagnoseEntry } from '../types';
import diagnoses from '../../data/diagnoses.json';

const getEntries = (): DiagnoseEntry[] => diagnoses;

export default { getEntries };
