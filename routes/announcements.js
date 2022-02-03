const express = require("express")
const app = express()

const Announcement = require('../models/Announcement')

app.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find().exec()

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

app.delete('/:id', async (req, res) => {
  const { id } = req.params

  try{
    const announcementDeleted = await Announcement.findOneAndDelete({ _id: id }).exec()
    
    res.json({ success: 'Announcement successfully deleted' })
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

module.exports= app