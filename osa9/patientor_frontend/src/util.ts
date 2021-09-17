import { HealthCheckRating } from './types';

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const isValidDateString = (dateStr: string): boolean => {
  return !isNaN(Date.parse(dateStr));
};

export const isValidHealtCheckRating = (rating: number): boolean => {
  return Object.values(HealthCheckRating).includes(rating);
};
