import express from 'express'
import notesRouter from './controller/notesController.js'
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'express-jwt';
import jwks  from 'jwks-rsa';
// var jwt = require('express-jwt');
// var jwks = require('jwks-rsa');

var app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Env vars
const PORT = 4000;
 




var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-3po6wuns.us.auth0.com/.well-known/jwks.json'
}),
audience: 'https://dev-3po6wuns.us.auth0.com/api/v2/',
issuer: 'https://dev-3po6wuns.us.auth0.com/',
algorithms: ['RS256']
});


app.use(jwtCheck);


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

app.use('/notes', notesRouter);

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})