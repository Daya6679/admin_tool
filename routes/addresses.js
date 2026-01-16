const express = require('express');
const router = express.Router();
const Address = require('../models/Address');
const Student = require('../models/Student');

// GET /api/addresses
router.get('/', async (req, res) => {
  try {
    const addresses = await Address.find().populate('student');
    res.json(addresses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/addresses/:id
router.get('/:id', async (req, res) => {
  try {
    const address = await Address.findById(req.params.id).populate('student');
    if (!address) return res.status(404).json({ error: 'Address not found' });
    res.json(address);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/addresses
router.post('/', async (req, res) => {
  try {
    const { street, city, state, zip, studentId } = req.body;
    const address = new Address({ street, city, state, zip, student: studentId });
    await address.save();
    res.json(address);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/addresses/:id
router.put('/:id', async (req, res) => {
  try {
    const { street, city, state, zip } = req.body;
    const address = await Address.findByIdAndUpdate(req.params.id, { street, city, state, zip }, { new: true });
    if (!address) return res.status(404).json({ error: 'Address not found' });
    res.json(address);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/addresses/:id
router.delete('/:id', async (req, res) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.id);
    if (!address) return res.status(404).json({ error: 'Address not found' });
    res.json({ message: 'Address deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;