const express = require("express")
const app = express()
const multer = require("multer")
const moment = require("moment")
const fs = require('fs')
const User = require('../models/User')

const upload = multer({ dest: 'public' })

//---Route qui récupère les utilisateurs---

app.get('/', async (req, res) => {
    try {
        const users = await User.find().exec()

        res.json(users)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

//---Route qui récupère l'utilisateur par son id---

app.get('/:id', async (req, res) => {
    const { id } = req.params
    
    try {
        const user = await User.findById(id).exec()
        .populate('teams')
        res.json(user)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

//---Route qui upload un logo---

app.post('/upload/:id', upload.single('avatar'), async(req, res) => {
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
    
        await User.findOneAndUpdate(
            { _id: id },
            { avatar: `http://localhost:5000/${fileName}` }
        )
    
        res.json({ success: "logo uploaded" })
    } catch (e) {
        res.status(500).json({ error : "something went wrong" })
    }
})

//---Route qui supprime un utilisateur---

app.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const userDeleted = await User.findOneAndDelete({ _id: id }).exec()

        res.json(userDeleted)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})


module.exports= app