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

//---Route qui filtre---

app.get('/filter', async (req, res) => {
    const { sort, region, roles, languages, disponibilities, available } = req.query
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
    if (available) {
        findParams = {
            ...findParams,
            available : { $in : available.split(",") }
        }
    }
    if (disponibilities) {
        findParams = {
            ...findParams,
            disponibilities : { $in : disponibilities.split(",") }
        }
    }
    if (roles) {
        findParams = {
            ...findParams,
            roles : { $in : roles.split(",") }
        }
    }
    
    // console.log(req.query)
    try {
        const filterUsers = await User.find(findParams)
            .sort({ username: sort })
            .populate('teams')
            .populate('announcements')
            .populate({
                path: 'conversations',
                populate: {
                    path: 'messages'
                }
            })
            .exec()
        res.json(filterUsers) 
    } catch (err) {
        console.log(err)
        res.status(500).json({error : err})
    }
})

//---Route qui récupère l'utilisateur par son id---

app.get('/:id', async (req, res) => {
    const { id } = req.params
    
    try {
        const user = await User.findById(id)
        .populate('teams', 'name')
        .populate('announcements')
        .populate({
            path: 'conversations',
            populate: {
                path: 'messages'
            }
        })
        .exec()
        res.json(user)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

//---Route qui upload un logo---

// app.post('/upload/:id', upload.single('avatar'), async(req, res) => {
//     const { id } = req.params
//     const { 
//         path,
//         destination,
//         originalname
//      } = req.file

//     try {
//         const date = moment().format('DD-MM-YYYY-hh-mm-ss')
//         const fileName = `${date}-${originalname}`
//         fs.renameSync(path, `${destination}/${fileName}`)
    
//         await User.findOneAndUpdate(
//             { _id: id },
//             { avatar: `http://localhost:5000/${fileName}` }
//         )
    
//         res.json({ success: "Avatar uploaded" })
//     } catch (e) {
//         res.status(500).json({ error : "something went wrong" })
//     }
// })

//---Route qui modifie un utilisateur---
app.put('/:id', async (req, res) => {
    const { id } = req.params
  
    try {
      const user = await User.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true }
      ).exec()
      res.json(user)
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
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