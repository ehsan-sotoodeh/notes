import express from 'express'
import Note from '../model/notesModel.js';
import mongoConnection from '../utils/mongoConnection.js'

var router = express.Router();

router.get('/', async function (req, res) {
  const mogno = await mongoConnection();

  res.send('Get all notes');
})

router.get('/:id', function (req, res) {
    res.status(200);
    res.send(`get note id : ${req.params['id']} `);
})

export default router;