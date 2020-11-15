
const mongoose = require('mongoose');
try{
  mongoose.connect('mongodb://localhost:270170/notes', {useNewUrlParser: true});
  console.log('Connected to mongoos!!!')
}catch(e){
  console.log("Connection Failed!!!",e)
}

module.exports = mongoose;