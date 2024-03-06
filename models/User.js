const mongoose = require('mongoose');
const { generate } = require('@theinternetfolks/snowflake');

const userSchema = new mongoose.Schema({
  id: { type: String, default: () => generate(), unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);