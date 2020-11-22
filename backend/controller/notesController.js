import express from 'express'
import Note from '../model/notesModel.js';
import mongoConnection from '../utils/mongoConnection.js'

var router = express.Router();

router.get('/', async (request, response) => {
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

router.get('/:id', async (request, response) =>{
  const id  = request.params['id'];
  try {
    const mogno = await mongoConnection();
    const result = await Note.findById(id)
    response.send({result});
  } catch (error) {
    response.send({
      error
    });

  }
})

router.delete('/:id', async (request, response) =>{
  const id  = request.params['id'];
  try {
    const mogno = await mongoConnection();
    const result = await Note.deleteOne({ _id: id })
    response.send({ result : 'Deleted item: ' + id  });
  } catch (error) {
    response.send({
      error
    });

  }
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