import React from 'react';

const Total = ({
  numberOfExercises,
}: {
  numberOfExercises: number;
}): JSX.Element => <p>{`Number of exercises ${numberOfExercises}`}</p>;

export default Total;
