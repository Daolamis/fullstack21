import React from 'react';
import { Header, Icon, SemanticICONS } from 'semantic-ui-react';
import { Entry } from '../types';
import DiagnosisCodes from './DiagnosisCodes';

interface EntryProps {
  entry: Entry;
  iconName: SemanticICONS;
  additionalInfo?: string;
}

const BasicHealthDetails: React.FC<EntryProps> = ({
  entry,
  iconName,
  additionalInfo,
}) => (
  <>
    <Header as="h4">
      {entry.date} <Icon name={iconName} /> {additionalInfo}
    </Header>
    <div style={{ fontStyle: 'italic' }}>{entry.description}</div>
    <DiagnosisCodes diagnosisCodes={entry.diagnosisCodes} />
  </>
);

export default BasicHealthDetails;
