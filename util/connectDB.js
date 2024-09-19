let mongoose = require("mongoose");

let db = mongoose.connection;
let connectDb = async () => {
  return await mongoose.connect(process.env.CLOUDDB);
};

module.exports = { connectDb, db };
