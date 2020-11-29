import express from 'express'
import Note from '../model/notesModel.js';
import mongoConnection from '../utils/mongoConnection.js';
import mongoose from 'mongoose';

var router = express.Router();

router.get('/', async (request, response) => {
  const  searchKey = request.query['searchKey'];
  const  searchValue = request.query['searchValue'];
  const  sortBy = request.query['sortBy'];
  const  sortDirection = request.query['sortDirection'];
  const  page = parseInt(request.query['page']);
  const  limit = parseInt(request.query['limit']);
  
  const filterObject = (searchValue)? {
    [searchKey]:{'$regex' : searchValue, '$options' : 'i'}
  }: {};

  const sortObj = (sortBy)?{
    [sortBy] : parseInt(sortDirection)
  }:{};

  const offset = (page)? (page-1) * limit : 0;

  try {
    const mogno = await mongoConnection();
    const result = await Note.find(filterObject)
      .sort(sortObj)
      .skip(offset)
      .limit(limit);

    response.send([...result]);
  } catch (error) {
    response.send({
      error
    });

  }

})

router.get('/:id', async (request, response) =>{
  const _id  = request.params['id'];
  try {
    const mogno = await mongoConnection();
    const result = await Note.findById(_id)
    response.send({result});
  } catch (error) {
    response.send({
      error
    });

  }
})

router.delete('/:id', async (request, response) =>{
  const _id  = request.params['id'];
  try {
    const mogno = await mongoConnection();
    const result = await Note.deleteOne({ _id })
    response.send({ result : 'Deleted item: ' + _id  });
  } catch (error) {
    response.send({
      error
    });

  }
});

router.put('/:id', async (request, response) =>{
  const _id  = mongoose.Types.ObjectId(request.params['id']);
  try {
    const mogno = await mongoConnection();
    const result = await Note.updateOne({ '_id': _id },{
      name : request.body.params.name,
      text : request.body.params.text,
      tags : request.body.params.tags,
    });
    const updatedNote = await Note.findById(_id)


    response.send({  ...updatedNote._doc });
  } catch (error) {
    response.send({
      error
    });

  }
});

router.post('/', async (request, response) => {

    try {    
      const mogno = await mongoConnection();

      const newNote = new Note({
        name : request.body.params.name,
        text : request.body.params.text,
        tags : request.body.params.tags,
        createdAt : new Date()
      });
      newNote.save((error,doc) => {
        if(error){
          console.log(error);
          response.send({
            error
          });
        }
        response.send({...doc._doc});
      });

    } catch (error) {
      response.send({
        error
      });
    }

})

export default router;