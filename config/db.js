const mongoose = require("mongoose");

const dbConnect = async () => {
    const dbName = 'loltogether'
    const dbUrlLocale = `mongodb://localhost:27017/${dbName}`
    const dbUrlOnline = `mongodb+srv://admin:admin@database.dm779.mongodb.net/loltogether?retryWrites=true&w=majority`

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