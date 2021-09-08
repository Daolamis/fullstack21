import express from "express";
import { bmiCalculator } from "./bmiCalculator";

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  try {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    if(isNaN(weight) || isNaN(height)){
      throw new Error('Parameters must be a numbers');
    }
    res.json({
      weight,
      height,
      bmi: bmiCalculator(height, weight)
    });
  } catch (e) {
    res.json({ error: "malformatted parameters" })
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
