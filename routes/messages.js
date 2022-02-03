const express = require("express")
const app = express()
// const { body, validationResult } = require("express-validator")
const User = require("../models/User")
const Conversation = require("../models/Conversation")
const Message = require('../models/Message')

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

// on attend de recevoir l'id de la conversation 
// (du sender et du receiver) le contenu
// une fois sauvegardé, on rajoute le message à la conversation grâce à son id

app.post('/', 
    // body('content')
    //     .isLength({ max:300 }).withMessage("Message is too long"),

    async (req, res) => {
        
        // const { errors } = validationResult(req)
        const { user_id, conversation } = req.body

        const message = await Message.create({
            text,
            sender,
            receiver,
            conversation
          })

        await User.findOneAndUpdate(
            { _id: user_id },
            { $push: { conversations: conversation_id } }
        )
        
        await Conversation.findOneAndUpdate(
            { _id: conversation_id },
            { $push: { message: message_id } }
        )
        res.json({ success: "message posted"})

        // if (errors.length > 0) {
        //     res.status(400).json({ errors })
        //     return
        // }

        // try {
        //     const message = await new Message({ ...req.body })

        //     message.save(async (err, message) => {

        //         if (message) {
        //             const getConversation = await Conversation.findById(conversation)
        //             getConversation.messages.push(message._id)
        //             getConversation.save()
            
        //             res.json(message)
        //             return
        //         }

        //         res.status(500).json({ error: err })
        //     })

        // } catch (err) {
        //     console.log(err)
        //     res.status(500).json({ error: err })
        // }
    }
)

//---Route qui récupère un message par son id---

app.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const message = await Message.findById(id)
        .populate('conversation')
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