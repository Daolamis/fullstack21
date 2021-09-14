import React from 'react';
import { useStateValue } from '../state';
import { Diagnosis } from '../types';

const DiagnosisCodes: React.FC<{ diagnosisCodes?: Array<Diagnosis['code']> }> =
  ({ diagnosisCodes }) => {
    const [{ diagnosis }] = useStateValue();
    if (!diagnosisCodes || diagnosisCodes.length === 0) {
      return null;
    }

    return (
      <ul>
        {diagnosisCodes.map((code) => (
          <li key={code}>
            {code} {diagnosis[code] && diagnosis[code].name}
          </li>
        ))}
      </ul>
    );
  };

export default DiagnosisCodes;
