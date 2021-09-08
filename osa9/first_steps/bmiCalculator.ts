
export const bmiCalculator = (height: number, mass: number): string => {
  const result = mass / Math.pow(height / 100, 2);

  if (result < 16) {
    return "Underweight (Severe thinness) ";
  }
  if (result < 16.9) {
    return "Underweight (Moderate thinness)";
  }
  if (result < 18.4) {
    return "Underweight (Mild thinness)";
  }
  if (result < 24.9) {
    return "Normal (healthy weight)";
  }
  if (result < 29.9) {
    return "Overweight (Pre-obese) ";
  }
  if (result < 34.9) {
    return "Obese (Class I)";
  }
  if (result < 39.9) {
    return "Obese (Class II)";
  }
  if (result > 40) {
    return "Obese (Class III)";
  }
  return `error in calculation, given height: ${height}, weight: ${mass}`;
};

const parseArgs = (args: string[]): [number, number] => {
  if (args.length != 4) {
    throw new Error('You need to give 2 arguments (height and mass)');
  }
  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error('All the arguments must be a numbers');
  }
  return [Number(args[2]), Number(args[3])];
}

try {
  const [height, mass] = parseArgs(process.argv);
  console.log(height, mass);
  console.log(bmiCalculator(height, mass));
} catch (e) {
  console.log('Something happend, message', e.message);
}