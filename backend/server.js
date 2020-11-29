import express from 'express'
import notesRouter from './controller/notesController.js'
import bodyParser from 'body-parser';
import cors from 'cors';
import jwtCheck from './utils/auth0Middlewear.js';
import dotenv from 'dotenv';
dotenv.config()

var app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(jwtCheck);


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

app.use('/notes', notesRouter);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})