const mongoose = require('mongoose');

const equationschema = new mongoose.Schema({
  a: Number,
  b: Number,
  c: Number,
  x1: Number,
  x2: Number
});

module.exports = mongoose.model('QEquation', equationschema);