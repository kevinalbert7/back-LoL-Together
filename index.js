const express = require("express")
const app = express()
const port = 5000
const { dbConnect } = require("./config/db")
const session = require("express-session")
const passport = require("./config/passport")
const cors = require("cors")
// const mongoose = require("mongoose")

const authRoutes = require('./routes/auth')
const messageRoutes = require('./routes/messages')
const teamRoutes = require ('./routes/teams')
const userRoutes = require ('./routes/users')
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

app.use('/auth',authRoutes)
app.use('/user',userRoutes)
app.use('/message',messageRoutes)
app.use('/team',teamRoutes)
app.use('/conversations',conversationsRoutes)

dbConnect()

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })