const express = require("express")
const app = express()
const port = 5000
const { dbConnect } = require("./config/db")
const session = require("express-session")
const passport = require("./config/passport")
const cors = require("cors")
// const mongoose = require("mongoose")

const authRoutes = require('./routes/auth')
const messagesRoutes = require('./routes/messages')
const teamsRoutes = require ('./routes/teams')
const usersRoutes = require ('./routes/users')
const conversationsRoutes = require('./routes/conversations')

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

app.use('/auth', authRoutes)
app.use('/users', usersRoutes)
app.use('/messages', messagesRoutes)
app.use('/teams', teamsRoutes)
app.use('/conversations', conversationsRoutes)

dbConnect()

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })