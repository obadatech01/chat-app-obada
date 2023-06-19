const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async () => {
  await mongoose.connect(process.env.DB_URL).then((conn) => {
    console.log(`Databases connected: ${conn.connection.host}`);
  });
};

// const connectDB = async () => {
//   const conn = await mongoose.connect(process.env.DB_URL)
// }

// mongoose.connection.on('connected', function () {
//   console.log('Mongoose default connection open to ' + process.env.MONGODB_URL)
// })

// mongoose.connection.on('error', function (err) {
//   console.log('Mongoose default connection error')
// })

// mongoose.connection.on('disconnected', function () {
//   console.log('Mongoose default connection disconnected')
// })

module.exports = connectDB;
