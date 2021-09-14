import React from 'react';
import { Diagnosis, Entry } from '../types';

interface EntryProps {
  entry: Entry;
  diagnosis: { [code: string]: Diagnosis };
}

const HealthEntry: React.FC<EntryProps> = ({ entry, diagnosis }) => (
  <div>
    <div>
      {entry.date} {entry.description}
    </div>
    {entry.diagnosisCodes && (
      <ul>
        {entry.diagnosisCodes.map((code) => (
          <li key={code}>
            {code} {diagnosis[code] && diagnosis[code].name}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default HealthEntry;
