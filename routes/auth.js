const express = require("express")
const app = express()
const axios = require("axios")
const bcrypt = require("bcrypt")

const passport = require("../config/passport")

const { verifyExistingUser } = require("../middlewares/auth")
const User = require("../models/User")

const api_key = process.env.API_KEY

//----------------LOGIN-----------------

app.post('/login',
  passport.authenticate("local"),
  (req, res) => {
    if (req.user) {
      req.logIn(req.user, err => {
        if (err) {
          res.status(401).json({ error: "Unauthorized" })
        } else {
          res.json(req.user)
        }
      })
    }
  }
)

//----------------SINGUP-----------------

app.post('/signup', verifyExistingUser, async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10)

    const infos = await axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.body.summoner_name}?api_key=${api_key}`)
    
    const newUser = await User.create({
      ...req.body,
      username: `${req.body.username}`,
      password: hash,
      summoner_infos : infos.data
    })

    res.json(newUser)
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: "Oups, something went wrong" })
  }
})

app.get('/me', (req, res) => {
  if (req.user) {
    res.json(req.user)
  } else {
    res.status(401).json({ error: "Unauthorized" })
  }
})
  
//----------------LOGOUT-----------------

app.delete('/logout', (req, res) => {
  req.session.destroy()
  req.logout() 
  res.status(200).json({ success: "Sucess" })
})
  
  module.exports = app