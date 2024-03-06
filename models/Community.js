const mongoose = require('mongoose');
const { generate } = require('@theinternetfolks/snowflake');

const communitySchema = new mongoose.Schema({
  id: { type: String, default: () => generate(), unique: true, required: true },
  name: { type: String, required: true, maxlength: 128 },
  slug: { type: String, unique: true, required: true, maxlength: 255 },
  owner: { type: String, required: true, ref: 'User' }, 
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Community', communitySchema);