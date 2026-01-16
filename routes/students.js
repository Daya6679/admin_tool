const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Address = require('../models/Address');

// GET /api/students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().populate('address');
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/students
router.post('/', async (req, res) => {
  try {
    const { name, class: studentClass, phone, mentorName, street, city, state, zip } = req.body;

    // Create address first
    const address = new Address({ street, city, state, zip });
    await address.save();

    // Create student with address reference
    const student = new Student({ name, class: studentClass, phone, mentorName, address: address._id });
    await student.save();

    // Populate address in response
    await student.populate('address');
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/students/:id
router.put('/:id', async (req, res) => {
  try {
    const { name, class: studentClass, phone, mentorName, street, city, state, zip } = req.body;

    const student = await Student.findById(req.params.id).populate('address');
    if (!student) return res.status(404).json({ error: 'Student not found' });

    // Update student
    student.name = name;
    student.class = studentClass;
    student.phone = phone;
    student.mentorName = mentorName;
    await student.save();

    // Update address
    if (student.address) {
      await Address.findByIdAndUpdate(student.address._id, { street, city, state, zip });
    }

    await student.populate('address');
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/students/:id
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    // Delete address if exists
    if (student.address) {
      await Address.findByIdAndDelete(student.address);
    }

    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Export to CSV
const { Parser } = require('json2csv');
router.get('/export', async (req, res) => {
  try {
    const students = await Student.find().populate('address');
    const fields = ['name', 'class', 'phone', 'mentorName', 'address.street', 'address.city', 'address.state', 'address.zip'];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(students);
    res.header('Content-Type', 'text/csv');
    res.attachment('students.csv');
    res.send(csv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;