
const mongoose = require('mongoose');
require('dotenv').config()

console.log(process.env.MONGO_CONNECTION_STRING)


async function MongoConnection(){
  try{
    //return mongoose.connect('mongodb://localhost:27017/notes', {useNewUrlParser: true});
    return mongoose.connect(process.env.MONGO_CONNECTION_STRING, {useNewUrlParser: true});
  }catch(e){
    throw(e);
  }
}


module.exports = MongoConnection;
