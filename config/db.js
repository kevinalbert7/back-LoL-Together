const mongoose = require("mongoose");

const dbConnect = async () => {
    const dbName = 'Lol_together'
    // const dbUrlLocale = `mongodb://localhost:27017/${dbName}`
    const dbUrlOnline = `mongodb+srv://LoL_Together:T9YeXe96r@loltogether.uxpl6.mongodb.net/test`

    try {
        mongoose.connect(dbUrlOnline)
        console.log(`Connected to ${dbName} database`)
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    dbConnect
}