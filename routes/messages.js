const express = require("express")
const { body, validationResult } = require("express-validator")
const Message = require("../models/Message")
const app = express()

//---Route qui récupère tous les messages---

app.get('/', async (req, res) => {
    try {
        const messages = await Message.find().exec()
        res.json(messages)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

//---Nouveau message lié à un utilisateur---

app.post('/', 
    body('content')
        .isLength({ max:300 }).withMessage("Message is too long"),

    async (req, res) => {
        // console.log("req.body :", req.body)
        
        const { errors } = validationResult(req)

        if (errors.length > 0) {
            res.status(400).json({ errors })
            return
        }

        try {
            const message = new Message({ ...req.body})
            // console.log(message)
            const messageInsered = await message.save()
            // console.log(messageInsered)
            res.json(messageInsered)
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err })
        }
    }
)

//---Route qui récupère un message par son id---

app.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const message = await Message.findById(id).exec()
        .populate('sender', 'receiver', 'conversation')
        .exec()

        res.json(message)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

//---Route pour supprimer un message---

app.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const messageDeleted = await Message.findOneAndDeleteOne({ _id: id }).exec()

        res.json(messageDeleted)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

module.exports = app