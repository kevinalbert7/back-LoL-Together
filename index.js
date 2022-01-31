const express = require("express")
const app = express()
const { dbConnect } = require("./config/db")
const session = require("express-session")
const passport = require("./config/passport")
const cors = require("cors")
const mongoose = require("mongoose")

app.use(cors({
    origin : 'http://localhost:3000',
    credentials : true
}))

app.use(express.json())
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: false
  }))
  
app.use(passport.initialize())
app.use(passport.session())




dbConnect()

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })