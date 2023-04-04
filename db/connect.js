const mongoose = require('mongoose');
require('dotenv').config()

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@note-taking.pvlsfex.mongodb.net/?retryWrites=true&w=majority`

const connection = mongoose.connect(uri, connectionParams)
          .then(() => console.log('Connection was successful'))
          .catch((err) => console.log(err))

module.exports = connection;


  