import React from 'react';
import { Segment } from 'semantic-ui-react';
import { HealthCheckEntry } from '../types';
import BasicHealthDetails from './BasicHealthDetails';
import HealthRatingBar from './HealthRatingBar';

const HealthCheckDetails: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => (
  <Segment>
    <BasicHealthDetails entry={entry} iconName="doctor" />
    <div>
      Health check results:{' '}
      <HealthRatingBar showText rating={entry.healthCheckRating} />
    </div>
  </Segment>
);

export default HealthCheckDetails;
