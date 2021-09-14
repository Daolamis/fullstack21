import React from 'react';
import { Entry } from '../types';
import { assertNever } from '../util';
import HealthCheckDetails from './HealthCheckDetails';
import HospitalDetails from './HospitalDetails';
import OccupationalHealthCareDetails from './OccupationalHealthcareDetails';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return <HealthCheckDetails entry={entry} />;
    case 'Hospital':
      return <HospitalDetails entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthCareDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
