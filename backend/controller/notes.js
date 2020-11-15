var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.send('Get all notes');
})

router.get('/:id', function (req, res) {
    res.status(200);
    res.send(`get note id : ${req.params['id']} `);
})

module.exports = router;