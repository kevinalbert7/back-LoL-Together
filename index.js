require('dotenv').config()
const express = require("express")
const app = express()
const port = process.env.PORT
// const { dbConnect } = require("./config/db")
const session = require("express-session")
const passport = require("./config/passport")
const cors = require("cors")
const morgan = require('morgan')
const mongoose = require("mongoose")
require('./models/User')

const authRoutes = require('./routes/auth')
const messageRoutes = require('./routes/messages')
const teamRoutes = require ('./routes/teams')
const userRoutes = require ('./routes/users')
const conversationsRoutes = require('./routes/conversations')

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on("erro", err => console.log(err))
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
app.use('/auth',authRoutes)
app.use('/user',userRoutes)
app.use('/message',messageRoutes)
app.use('/team',teamRoutes)
app.use('/conversations',conversationsRoutes)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })