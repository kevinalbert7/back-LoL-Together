const mongoose = require("mongoose");

const dbConnect = async () => {
    const dbName = 'Lol_together'
    // const dbUrlLocale = `mongodb://localhost:27017/${dbName}`
    const dbUrlOnline = `mongodb+srv://Admin:Konexio@database.dm779.mongodb.net/${dbName}?retryWrites=true&w=majority`

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