const express = require("express")
const multer = require("multer")
const app = express()
// const moment = require("moment")

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

//---Route qui récupère une team par son id---

app.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const team = await Team.findById(id).exec()

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

app.post('/:id', upload.single('logo'), (req, res) => {
    console.log(req.file)
    const { 
        path,
        destination,
        originalname
     } = req.file

    const date = moment().format('DD-MM-YYYY-hh-mm-ss')
    console.log(date)
    const fileName = `${date}-${originalname}`
    console.log(fileName)
    fs.renameSync(path, `${destination}/${originalname}`)
    res.json({ success: "logo uploaded" })
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