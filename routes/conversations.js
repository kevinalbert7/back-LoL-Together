const express = require("express")
const { body, validationResult } = require("express-validator")
const Conversation = require("../models/Conversation")
const lodash = require("lodash")
const User = require("../models/User")
const app = express()

//---Route qui récupère les conversations---

app.get('/', async (req, res) => {
    try {
        const conversations = await Conversation.find()
        .exec()
        res.json(conversations)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

//---Route qui récupère 1 conversation des 2 users

app.get('/users', async (req, res) => {
    const { ids } = req.query
    const queryUsers = ids.split(",")

    try {
        const conversation = await Conversation.findOne(
            { users : [queryUsers[0], queryUsers[1]] }
        )
        .populate('messages')
        .exec()
        if (!conversation) {
            const conversation = await Conversation.findOne(
                { users : [queryUsers[1], queryUsers[0]] }
            )
            .populate('messages')
            .exec()
            res.json(conversation)
        }
        
        res.json(conversation)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error })
    }
})

//---Route qui récupère une conversation par son id---

app.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const conversations = await Conversation.findById(id).exec()

        res.json(conversations)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

//---Route qui supprime une conversation---

app.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const conversationDeleted = await Conversation.findOneAndDelete({ _id: id }).exec()

        res.json(conversationDeleted)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

module.exports = app