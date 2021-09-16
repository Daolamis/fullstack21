import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Button, Container, Icon, Loader } from 'semantic-ui-react';
import EntryDetails from '../components/EntryDetails';
import { apiBaseUrl } from '../constants';
import { addEntry, setPatient, useStateValue } from '../state';
import { Entry, Gender, NewEntry, Patient } from '../types';
import AddEntryModal from '../AddEntryModal';

const PatientPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  useEffect(() => {
    if (patient && patient.id === id) {
      return; // patient is already in state
    }
    // don't show previous patient
    dispatch({ type: 'SET_PATIENT', payload: null });

    const fetchPatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientFromApi));
      } catch (e) {
        console.error(e.response?.data || 'Unknown Error');
      }
    };
    void fetchPatient();
  }, [id]);

  if (!patient) {
    return (
      <div>
        <Loader active />
      </div>
    );
  }

  const submitNewEntry = async (entry: NewEntry) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        entry
      );
      dispatch(addEntry(newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  return (
    <Container>
      <h2>
        {patient.name} {getGenderIcon(patient.gender)}
      </h2>
      <div>date of birth: {patient.dateOfBirth}</div>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3>entries</h3>
      {patient.entries.map((e) => (
        <EntryDetails key={e.id} entry={e} />
      ))}

      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </Container>
  );
};

const getGenderIcon = (gender: Gender): JSX.Element => {
  if (gender === Gender.Female) {
    return <Icon name="venus" size="large" />;
  }
  if (gender === Gender.Male) {
    return <Icon name="mars" size="large" />;
  }
  return <Icon name="other gender" size="large" />;
};

export default PatientPage;
