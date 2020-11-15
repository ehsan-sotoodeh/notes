
const mongoose = require('mongoose');

const schema = new mongoose.Schema({ name: 'string', size: 'string' });
const Note = mongoose.model('Note', schema);

module.exports = Note;