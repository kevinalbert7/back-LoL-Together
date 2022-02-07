const express = require("express")
const app = express()

const Announcement = require('../models/Announcement')
const Team = require('../models/Team')
const User = require('../models/User')

app.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .sort({ createdAt: '-1' })
      .populate('user', 'username summoner_name region summoner_infos')
      .populate('team', 'leader_id name logo region')
      .exec()

    res.json(announcements)
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

app.get('/:id', async (req, res) => {
  const { id } = req.params
  
  try {
      const announcements = await Announcement.find({ user: id })
      .sort({ createdAt: '-1' })
      .exec()
      res.json(announcements)
  } catch (err) {
      res.status(500).json({ error: err })
  }
})

app.post('/', async (req, res) => {
  try {
    const newAnnouncement = await Announcement.create({
      ...req.body
    })
    
    res.json(newAnnouncement)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: "Oups, something went wrong" })
  }
})

app.put('/:id', async (req, res) => {
  const { id } = req.params

  try {
    const announcement = await Announcement.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    ).exec()
    res.json(announcement)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err })
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
      } catch (err) {
          res.status(500).json({ error: err })
      }
      
    } 
  if (sortby === "users") {
    try {
        const users = await User.find()
        .populate('announcements')
        .exec()
        res.json(users)
    } catch (err) {
        res.status(500).json({ error: err })
    }
  }
})

app.delete('/:id', async (req, res) => {
  const { id } = req.params

  try{
    await Announcement.findOneAndDelete({ _id: id }).exec()
    
    res.json({ success: 'Announcement successfully deleted' })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

module.exports= app