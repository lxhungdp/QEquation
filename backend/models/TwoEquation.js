// models/TwoEquation.js

const mongoose = require('mongoose');

const twoEquationSchema = new mongoose.Schema({
  a1: Number,
  b1: Number,
  c1: Number,
  a2: Number,
  b2: Number,
  c2: Number,
  x: Number,
  y: Number
});

module.exports = mongoose.model('TwoEquation', twoEquationSchema);
