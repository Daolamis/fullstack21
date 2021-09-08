interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
};

const ratingDescriptionTable = {
  1: "Not that good, increase yout training ",
  2: "Not too bad but could be better",
  3: "You're training hard, remember to rest"
}

type CalculatorFunction = (exercises: number[], target: number) => ExerciseResult

const exerciseCalculator: CalculatorFunction = (exercises, target) => {
  const periodLength = exercises.length;
  const trainingDays = exercises.reduce((hour, sum) => hour > 0 ? sum + 1 : sum, 0);
  const totalHours = exercises.reduce((hour, sum) => sum + hour, 0);
  const average = totalHours / periodLength;
  const success = average >= target;
  // rating 1 : under 90% of target
  // rating 2 : 90% - 109% of target
  // rating 3 : over 120% of target
  const rating: 1 | 2 | 3 = average / target < 0.9 ? 1 : average / target < 1.2 ? 2 : 3;
  const ratingDescription = ratingDescriptionTable[rating];

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2));