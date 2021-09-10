import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps): JSX.Element => (
  <>
    {courseParts.map((c) => (
      <Part key={c.name} coursePart={c} />
    ))}
  </>
);

export default Content;
