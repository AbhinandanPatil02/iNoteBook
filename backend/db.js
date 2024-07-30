// // db.js

// const mongoose = require('mongoose');

// // const connectionString = 'mongodb://localhost:27017/?tls=false&directConnection=false';
// const connectionString = 'mongodb://localhost:27017/?tls=false&directConnection=false';

// async function connectToMongo() {
//   try {
//     await mongoose.connect(connectionString);
//     console.log("Connected to MongoDB successfully");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// }

// module.exports = connectToMongo;
// db.js

const mongoose = require('mongoose');

// const connectionString = 'mongodb://localhost:27017/?tls=false&directConnection=false';
const connectionString = 'mongodb://localhost:27017/inotebook?tls=false&directConnection=false';

async function connectToMongo() {
  try {
    await mongoose.connect(connectionString);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = connectToMongo;
