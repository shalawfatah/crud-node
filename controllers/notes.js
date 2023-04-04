const Note = require('../models/Note');

const postNote = async (req, res) => {
    try {
      const { text, completed } = req.body;
      const newNote = new Note({
        text,
        completed
      });
      await newNote.save();
      res.status(201).json(newNote);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
}

const getAllNotes = async (req, res) => {
    try {
      const notes = await Note.find();
      res.status(200).json(notes);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }

  const updateNote = async (req, res) => {
    try {
      const { id } = req.params;
      const { text, completed } = req.body;
  
      const note = await Note.findByIdAndUpdate(
        id,
        { text, completed },
        { new: true }
      );
  
      if (!note) {
        return res.status(404).json({ msg: 'Note not found' });
      }
  
      res.status(200).json(note);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };

  const deleteNote = async (req, res) => {
    try {
      const { id } = req.params;
  
      const note = await Note.findByIdAndDelete(id);
  
      if (!note) {
        return res.status(404).json({ msg: 'Note not found' });
      }
  
      res.status(200).json({ msg: 'Note deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  
  const getNote = async (req, res) => {
    try {
      const { id } = req.params;
  
      const note = await Note.findById(id);
  
      if (!note) {
        return res.status(404).json({ msg: 'Note not found' });
      }
  
      res.status(200).json(note);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  };
  

  module.exports = { postNote, getAllNotes, updateNote, deleteNote, getNote };