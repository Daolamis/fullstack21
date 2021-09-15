import { Diagnosis } from '../types';
import diagnoses from '../../data/diagnoses.json';

const getAll = (): Diagnosis[] => diagnoses;

export default { getAll };
