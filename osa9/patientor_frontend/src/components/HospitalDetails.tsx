import React from 'react';
import { Segment } from 'semantic-ui-react';
import { HospitalEntry } from '../types';
import BasicHealthDetails from './BasicHealthDetails';

const HospitalDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => (
  <Segment>
    <BasicHealthDetails entry={entry} iconName="hospital" />
    discharged at {entry.discharge.date}. {entry.discharge.criteria}
  </Segment>
);

export default HospitalDetails;
