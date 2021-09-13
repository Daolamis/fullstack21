import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Container, Icon, Loader } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Gender, Patient } from '../types';

const PatientPage = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();

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
        dispatch({ type: 'SET_PATIENT', payload: patientFromApi });
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

  return (
    <Container>
      <h2>
        {patient.name} {getGenderIcon(patient.gender)}
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
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
