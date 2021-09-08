import express from "express";
import { bmiCalculator } from "./bmiCalculator";
import { exerciseCalculator } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  try {
    const weight = parseNumber(req.query.weight);
    const height = parseNumber(req.query.height);

    res.json({
      weight,
      height,
      bmi: bmiCalculator(height, weight)
    });
  } catch (e) {
    res.status(400).json({ error: "malformatted parameters" });
  }
});

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { target: rawTarget, daily_exercises: rawDailyExercises } = req.body;
    if (!rawTarget || !rawDailyExercises) {
      throw new Error('parameters missing');
    }
    const target = parseNumber(rawTarget);
    const dailyExercises = parseNumberArray(rawDailyExercises);
    const reply = exerciseCalculator(dailyExercises, target);
    res.json(reply);
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).json({ error: error.message }); // eslint-disable-line @typescript-eslint/no-unsafe-assignment
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseNumberArray = (arr:any) => {
  if (!Array.isArray(arr)) {
    throw new Error('malformatted parameters');
  }
  return arr.map(parseNumber);
};
 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseNumber = (value:any) => {
  const res = Number(value);
  if (isNaN(res)) {
    throw new Error('malformatted parameters');
  }
  return res;
};