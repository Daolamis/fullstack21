import React from 'react';
import { Segment } from 'semantic-ui-react';
import { OccupationalHealthCareEntry } from '../types';
import BasicHealthDetails from './BasicHealthDetails';

const OccupationalHealthCareDetails: React.FC<{
  entry: OccupationalHealthCareEntry;
}> = ({ entry }) => {
  return (
    <Segment>
      <BasicHealthDetails
        entry={entry}
        iconName="stethoscope"
        additionalInfo={entry.employerName}
      />
      {entry.sickLeave && (
        <div>
          Sickleave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
        </div>
      )}
    </Segment>
  );
};

export default OccupationalHealthCareDetails;
