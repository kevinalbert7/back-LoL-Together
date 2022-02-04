const express = require("express")
const app = express()
// const { verifyExistingConversation } = require("../middlewares/conversation")
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

app.post('/:id', async (req, res) => {
    const { id } = req.params
    const { 
        user_id,
        conversation,
        conversation_id,
        message_id
    } = req.body

    // const message = await Message.create({
    //     conversation
    // })

    await Conversation.findById(id)

    await User.findOneAndUpdate(
        { _id: user_id },
        { $push: { conversations: conversation_id } }
    )
    
    await Conversation.findOneAndUpdate(
        { _id: conversation_id },
        { $push: { message: message_id } }
    )
    // res.json({ success: "message posted"})

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
})

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