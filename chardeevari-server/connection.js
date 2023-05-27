const mongoose = require('mongoose');
require('dotenv').config();

async function connectMongoDb(url){

    return mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
}

module.exports = {
    connectMongoDb
}