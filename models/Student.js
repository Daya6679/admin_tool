const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  phone: { type: String, required: true },
  mentorName: { type: String, required: true },
  address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' }
});

module.exports = mongoose.model('Student', studentSchema);