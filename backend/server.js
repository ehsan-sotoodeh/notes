import express from 'express'
import notesRouter from './controller/notesController.js'


var app = express()

//Env vars
const PORT = 4000;




// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

app.use('/notes', notesRouter);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})