const express = require('express');
const {getAllNotes, postNote, updateNote, deleteNote, getNote} = require('../controllers/notes');
const router = express.Router();
const Note = require('../models/Note');

// GET all notes
router.get('/', getAllNotes);

// GET one note
router.get('/:id', getNote);

// POST a new note
router.post('/', postNote);

// PUT an existing note
router.put('/:id', updateNote);

// DELETE an existing note
router.delete('/:id', deleteNote);

module.exports = router;
