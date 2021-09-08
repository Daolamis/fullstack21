interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: 1 | 2 | 3;
  ratingDescription: string;
  target: number;
  average: number;
}

const ratingDescriptionTable = {
  1: "Not that good, increase your training ",
  2: "Not too bad but could be better",
  3: "You're training hard, remember to rest"
};

export const exerciseCalculator = (exercises:number[], target:number):ExerciseResult => {
  const periodLength = exercises.length;
  const trainingDays = exercises.reduce((sum, hour) => hour > 0 ? sum + 1 : sum, 0);
  const totalHours = exercises.reduce((sum, hour) => sum + hour, 0);
  const average = totalHours / periodLength;
  const success = average >= target;
  // rating 1 : under 90% of target
  // rating 2 : 90% - 119% of target
  // rating 3 : 120% and over the target
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

const parseArg = (arg: string): number => {
  const ret = Number(arg);
  if (isNaN(ret)) {
    throw new Error('Arguments must be a numbers');
  }
  return ret;
};

try {
  if (process.argv.length < 4) {
    throw new Error("You need to give at least two arguments");
  }
  // omit first two items
  const [, , ...theArgs] = process.argv;
  const [target, ...dailyHours] = theArgs.map(parseArg);

  console.log(exerciseCalculator(dailyHours, target));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Something happend, message ', e.message);
}