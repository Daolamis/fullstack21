import { Diagnose } from '../types';
import diagnoses from '../../data/diagnoses.json';

const getEntries = (): Diagnose[] => diagnoses;

export default { getEntries };
