import React from 'react';

interface ContentProps {
  courseParts: {
    name: string;
    exerciseCount: number;
  }[];
}

const Content = ({ courseParts }: ContentProps): JSX.Element => (
  <>
    {courseParts.map((c) => (
      <p key={c.name}>
        {c.name} {c.exerciseCount}
      </p>
    ))}
  </>
);

export default Content;
