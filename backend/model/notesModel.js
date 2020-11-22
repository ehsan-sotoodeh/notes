
import mongoose from 'mongoose';

const schema = new mongoose.Schema({ name: 'string', text: 'string', tags : [] });
const Note = mongoose.model('Note', schema);

export default Note;