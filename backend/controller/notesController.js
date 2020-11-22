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
      error
    });

  }

})

router.get('/:id', function (request, response) {
  response.status(200);
  response.send(`get note id : ${request.params['id']} `);
})

router.post('/', async (request, response) => {

    try {    
      const mogno = await mongoConnection();

      const newNote = new Note({
        name : request.body.name,
        text : request.body.text,
        tags : request.body.tags,
      });
      newNote.save((error,doc) => {
        if(error){
          console.log(error);
          response.send({
            error
          });
        }
        response.send({result : doc})
      });

    } catch (error) {
      response.send({
        error
      });
    }

})

export default router;