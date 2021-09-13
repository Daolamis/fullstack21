import React from 'react';
import { Entry } from '../types';

interface EntryProps {
  entry: Entry;
}

const HealthEntry = ({ entry }: EntryProps): JSX.Element => (
  <div>
    <div>
      {entry.date} {entry.description}
    </div>
    {entry.diagnosisCodes && (
      <ul>
        {entry.diagnosisCodes.map((code) => (
          <li key={code}>{code}</li>
        ))}
      </ul>
    )}
  </div>
);

export default HealthEntry;
