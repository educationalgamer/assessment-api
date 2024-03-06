const mongoose = require('mongoose');
const { generate } = require('@theinternetfolks/snowflake');

const memberSchema = new mongoose.Schema({
  id: { type: String, default: () => generate(), unique: true, required: true },
  community: { type: String, required: true, ref: 'Community' },
  user: { type: String, required: true, ref: 'User' }, 
  role: { type: String, required: true, ref: 'Role' }, 
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Member', memberSchema);