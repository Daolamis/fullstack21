import React from 'react';
import { CoursePart } from '../types';

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  return (
    <div>
      <strong>
        {coursePart.name} {coursePart.exerciseCount}
      </strong>
      {(() => {
        switch (coursePart.type) {
          case 'normal':
            return (
              <div style={{ fontStyle: 'italic' }}>
                {coursePart.description}
              </div>
            );

          case 'groupProject':
            return <div>project exercices {coursePart.exerciseCount}</div>;

          case 'submission':
            return (
              <>
                <div style={{ fontStyle: 'italic' }}>
                  {coursePart.description}
                </div>
                <div>submit to {coursePart.exerciseSubmissionLink}</div>
              </>
            );
          case 'special':
            return (
              <>
                <div style={{ fontStyle: 'italic' }}>
                  {coursePart.description}
                </div>
                <div>required skills: {coursePart.requirements.join(', ')}</div>
              </>
            );
          default:
            return assertNever(coursePart);
        }
      })()}
      <br />
    </div>
  );
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part;
