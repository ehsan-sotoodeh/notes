import express from 'express'
import Note from '../model/notesModel.js';
import mongoConnection from '../utils/mongoConnection.js'

var router = express.Router();

router.get('/', async function (request, response) {
  try {
    const mogno = await mongoConnection();
    const result = await Note.find({});
    response.send({result});
  } catch (error) {
    response.send({
      'result': [],
      error
    });

  }

})

router.get('/:id', function (req, res) {
    res.status(200);
    res.send(`get note id : ${req.params['id']} `);
})

export default router;