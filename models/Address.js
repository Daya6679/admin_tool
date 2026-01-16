const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }
});

module.exports = mongoose.model('Address', addressSchema);