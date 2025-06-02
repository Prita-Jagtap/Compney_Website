// routes/contact.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// POST - Submit contact form
router.post('/', (req, res) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }
  const sql = 'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, phone || null, message], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ success: true, id: result.insertId, message: 'Message sent successfully' });
  });
});

// GET - Get all contact form submissions
router.get('/', (req, res) => {
  db.query('SELECT * FROM contacts ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
});

module.exports = router;
