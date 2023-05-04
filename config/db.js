const mongoose = require("mongoose");

const dbConnect = async () => {
  const dbName = "loltogether";
  const dbUrl = `mongodb://localhost:27017/${dbName}`;

  try {
    mongoose.connect(dbUrl);
    const db = mongoose.connection;
    db.once("open", () => console.log(`Connected to ${dbName} db`));
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
    dbConnect
}