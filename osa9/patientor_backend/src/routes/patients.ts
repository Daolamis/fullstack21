import express from 'express';
import patientService from '../services/patientService';
import { toNewEntry, toNewPatientEntry } from '../util';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getAll());
});

router.get('/:id', (req, res) => {
  const patient = patientService.findById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (req, res) => {
  try {
    const patient = toNewPatientEntry(req.body);
    const savedPatient = patientService.create(patient);
    res.json(savedPatient);
  } catch (e) {
    res.status(400).json({ error: (<Error>e).message });
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const entry = toNewEntry(req.body);
    const newEntry = patientService.createEntry(req.params.id, entry);
    res.json(newEntry);
  } catch (e) {
    res.status(400).json({ error: (<Error>e).message });
  }
});
export default router;
