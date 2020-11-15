var express = require('express');
var Note = require('../model/notesModel');
var MongoConnection = require('../utils/mongoConnection');

var router = express.Router();

router.get('/', async function (req, res) {
  const mognoConnection = await MongoConnection();

  res.send('Get all notes');
})

router.get('/:id', function (req, res) {
    res.status(200);
    res.send(`get note id : ${req.params['id']} `);
})

module.exports = router;