require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

const QEquation = require('./models/QEquation');

app.post('/solve', async (req, res) => {
  const { a, b, c } = req.body;
  const delta = b * b - 4 * a * c;
  let x1 = null;
  let x2 = null;

  if (delta >= 0) {
    x1 = (-b + Math.sqrt(delta)) / (2 * a);
    x2 = (-b - Math.sqrt(delta)) / (2 * a);
  }

  const equation = new QEquation({ a, b, c, x1, x2 });
  await equation.save();
  res.json({ x1, x2 });
});

app.get('/records', async (req, res) => {
    const records = await QEquation.find().sort({ _id: -1 });
    res.json(records);
  });
  

const TwoEquation = require('./models/TwoEquation');
app.post('/twoequations/solve', async (req, res) => {
    const { a1, b1, c1, a2, b2, c2 } = req.body;
  
    const determinant = a1 * b2 - a2 * b1;
    if (determinant === 0) {
      return res.status(400).json({ error: 'No unique solution exists (determinant = 0).' });
    }
  
    const x = (c1 * b2 - c2 * b1) / determinant;
    const y = (a1 * c2 - a2 * c1) / determinant;
  
    const equation = new TwoEquation({ a1, b1, c1, a2, b2, c2, x, y });
    await equation.save();
    res.json({ x, y });
  });
  
  app.get('/twoequations/records', async (req, res) => {
    const records = await TwoEquation.find().sort({ _id: -1 });
    res.json(records);
  });



  app.listen(5001, () => console.log('Backend running on http://localhost:5001'));