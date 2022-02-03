require('dotenv').config()

const express = require("express")
const app = express()
const port = process.env.PORT
const session = require("express-session")
const passport = require("./config/passport")
const cors = require("cors")
const morgan = require('morgan')
const mongoose = require("mongoose")

console.log("DB.URL :", process.env.DB_URL)
const DB_URL = process.env.DB_URL
mongoose.connect(process.env.DB_URL)
const db = mongoose.connection

db.on("error", (err) => console.log(err))
db.once("open", () => console.log("Connected to db"))

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
app.use(morgan('tiny'))
app.use(passport.initialize())
app.use(passport.session())

require('./models/Announcement')
require('./models/Conversation')
require('./models/Team')
require('./models/Message')
require('./models/User')

const authRoutes = require('./routes/auth')
const messagesRoutes = require('./routes/messages')
const teamsRoutes = require ('./routes/teams')
const usersRoutes = require ('./routes/users')
const conversationsRoutes = require('./routes/conversations')
const announcementsRoutes = require('./routes/announcements')

app.use('/auth', authRoutes)
app.use('/users', usersRoutes)
app.use('/messages', messagesRoutes)
app.use('/teams', teamsRoutes)
app.use('/conversations', conversationsRoutes)
app.use('/announcements', announcementsRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })