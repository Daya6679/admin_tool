const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
  mentorName: { type: String, required: true },
  mentor_id: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  contact_no: { type: String, required: true }
});

module.exports = mongoose.model('Mentor', mentorSchema);