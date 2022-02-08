const express = require("express")
const app = express()

const Announcement = require('../models/Announcement')
const Team = require('../models/Team')
const User = require('../models/User')

const { isAuthentified } = require("../middlewares/auth")

app.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .sort({ createdAt: '-1' })
      .populate('user', 'username summoner_name region summoner_infos')
      .populate('team', 'leader_id name logo region')
      .exec()

    res.json(announcements)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

app.get('/:id', async (req, res) => {
  const { id } = req.params
  
  try {
      const announcements = await Announcement.find({ user: id })
      .sort({ createdAt: '-1' })
      .exec()
      res.json(announcements)
  } catch (error) {
      console.log(error)
      res.status(500).json({ error })
  }
})

app.post('/', isAuthentified, async (req, res) => {
  try {
    const newAnnouncement = await Announcement.create({
      ...req.body
    })
    
    res.json(newAnnouncement)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

app.put('/:id', isAuthentified, async (req, res) => {
  const { id } = req.params

  try {
    const announcement = await Announcement.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    ).exec()
    res.json(announcement)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

//---Route qui filtre par users ou teams---
app.get('/filter', async (req, res) => {
  const { sortby } = req.query

  if (sortby === "teams") {      
      try {
        const teams = await Team.find()
        .populate('announcements')
        .exec()
        res.json(teams)
      } catch (error) {
          console.log(error)
          res.status(500).json({ error })
      }
      
    } 
  if (sortby === "users") {
    try {
        const users = await User.find()
        .populate('announcements')
        .exec()
        res.json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
  }
})

app.delete('/:id', isAuthentified, async (req, res) => {
  const { id } = req.params

  try{
    await Announcement.findOneAndDelete({ _id: id }).exec()
    
    res.json({ success: 'Announcement successfully deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
})

module.exports= app