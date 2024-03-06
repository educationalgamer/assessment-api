const mongoose = require('mongoose');
const { generate } = require('@theinternetfolks/snowflake');

const roleSchema = new mongoose.Schema({
  id: { type: String, default: () => generate(), unique: true, required: true },
  name: { type: String, unique: true, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Role', roleSchema);