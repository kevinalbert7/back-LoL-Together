const express = require("express")
const multer = require("multer")
const app = express()
const moment = require("moment")
const fs = require('fs')
const { verifyExistingTeam } = require("../middlewares/auth")
const Team = require('../models/Team')

const upload = multer({ dest: 'public' })

//---Route qui récupère toutes les teams---

app.get('/', async (req, res) => {
    try {
        const teams = await Team.find().exec()
        
        res.json(teams)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

//---Route qui filtre---

app.get('/filter', async (req, res) => {
    const { sort, region, disponibilty, languages } = req.query
    let findParams = {}

    if (region) {
        findParams = {
            ...findParams,
            region : { $in : region.split(",") }
        }
    }
    if (languages) {
        findParams = {
            ...findParams,
            languages : { $in : languages.split(",") }
        }
    }
    if (disponibilty) {
        findParams = {
            ...findParams,
            disponibilty : { $in : disponibilty.split(",") }
        }
    }
    
    console.log(req.query)

    try {
        const filterTeams = await Team.find(findParams)
            .sort({ name: sort })
            .populate('users')
            .populate('announcements')
            .exec()
        res.json(filterTeams) 
    } catch (err) {
        console.log(err)
        res.status(500).json({error : err})
    }
})

//---Route qui récupère une team par son id---

app.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const team = await Team.findById(id)
        .populate('users')
        .populate('announcements')
        .exec()

        res.json(team)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})



//---Route qui créé une nouvelle team---

app.post('/', verifyExistingTeam, async (req, res) => {
    try {  
      const newTeam = await Team.create({
        ...req.body,
      })
  
      res.json(newTeam)
    } catch (e) {
      console.log(e)
      res.status(500).json({ error: "Oups, something went wrong" })
    }
})

//---Route qui upload un logo---

app.post('/upload/:id', upload.single('logo'), async(req, res) => {
  const { id } = req.params
  const { 
      path,
      destination,
      originalname
   } = req.file

  try {
      const date = moment().format('DD-MM-YYYY-hh-mm-ss')
      const fileName = `${date}-${originalname}`
      fs.renameSync(path, `${destination}/${fileName}`)
  
      await Team.findOneAndUpdate(
          { _id: id },
          { logo: `http://localhost:5000/${fileName}` }
      )
  
      res.json({ success: "Logo uploaded" })
  } catch (e) {
      res.status(500).json({ error : "something went wrong" })
  }
})


//---Route qui modifie une team---
app.put('/:id', async (req, res) => {
    const { id } = req.params
  
    try {
      const team = await Team.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true }
      ).exec()
      res.json(team)
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
})

//---Route qui supprime une team---

app.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const teamDeleted = await Team.findOneAndDelete({ _id: id }).exec()

        res.json(teamDeleted)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

module.exports= app