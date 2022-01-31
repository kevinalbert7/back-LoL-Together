const express = require("express")
const { body, validationResult } = require("express-validator")
const Message = require("../models/Message")
const User = require("../models/User")
const app = express()

//---Route qui récupère les messages---

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
        const { user_id } = req.body

        const { errors } = validationResult(req)

        if (errors.length > 0) {
            res.status(400).json({ errors })
            return
        }

        try {
            const message = new Message({ ...req.body})

            const messageInsered = await message.save()

            const getUser = await User.findById(user_id)

            if (getUser) {
                getUser.messages.push(messageInsered._id)
                await getUser.save()
            }

            res.json(messageInsered)
        } catch (err) {
            res.status(500).json({ error: err })
        }
    }
)

//---Route qui récupère un message par son id---

app.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const message = await Message.findById(id).exec()

        res.json(message)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

//---Route pour supprimer un message---

app.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const messageDeleted = await Message.deleteOne({ _id: id }).exec()

        res.json(messageDeleted)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

module.exports = app