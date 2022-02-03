const express = require("express")
const { body, validationResult } = require("express-validator")
const Conversation = require("../models/Conversation")
const User = require("../models/User")
const app = express()

//---Route qui récupère les conversations---

app.get('/', async (req, res) => {
    try {
        const conversations = await Conversation.find().exec()
        res.json(conversations)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

//---Route qui récupère une conversation par son id---

app.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const conversation = await Conversation.findById(id).exec()
            .populate('messages', 'user')
            .exec()

        res.json(conversation)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

//---Route post d'une conversation---

app.post('/', async (req, res) => {
    try {
      const conversation = await new Conversation({ ...req.body })
  
      conversation.save((err, conversation) => {
        if (conversation) {
          res.json(conversation)
          return
        }
  
        console.log(err)
        res.status(500).json({ error: err })
      })
    } catch (error) {
      console.log(err)
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