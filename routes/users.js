const express = require("express")
// const multer = require("multer")
// const moment = require("moment")

const { verifyExistingUser } = require("../middlewares/auth")
const User = require('../models/User')

const app = express()
// const upload = multer({ dest: 'public' })

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

        res.json(user)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

app.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const userDeleted = await User.deleteOne({ _id: id }).exec()

        res.json(userDeleted)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})


//---Route qui upload un document---

// app.post('/:id', upload.single('profilePicture'), (req, res) => {
//     console.log(req.file)
//     const { 
//         path,
//         destination,
//         originalname
//      } = req.file

//     const date = moment().format('DD-MM-YYYY-hh-mm-ss')
//     console.log(date)
//     const fileName = ${date}-${originalname}
//     console.log(fileName)
//     fs.renameSync(path, ${destination}/${originalname})
// })

module.exports= app