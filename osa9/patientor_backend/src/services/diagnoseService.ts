import { Diagnosis } from '../types';
import diagnoses from '../../data/diagnoses.json';

const getEntries = (): Diagnosis[] => diagnoses;

export default { getEntries };
