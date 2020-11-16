
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()


async function mongoConnection(){
  try{
    //return mongoose.connect('mongodb://localhost:27017/notes', {useNewUrlParser: true});
    return mongoose.connect(process.env.MONGO_CONNECTION_STRING, {useNewUrlParser: true});
  }catch(e){
    throw(e);
  }
}


export default mongoConnection;
