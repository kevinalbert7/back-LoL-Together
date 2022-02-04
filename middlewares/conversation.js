const Conversation = require("../models/Conversation")
const Message = require("../models/Message")

//---Vérifie si une conversation existe entre 2 utilisateurs---
    // -si oui je renvoie la Conversation
    // -sinon next

// const verifyExistingConversation = async(req, res, next) => {
//     const { id } = req.body

//     const conversation = await Conversation.findById(id)

//     // if(conversation) {
//     //     res.status(409).json({ error: "Conversation already exists" })
//     //     // res.json(conversation)
//     // } else {
//     //     next()
//     // }

//     if(!conversation) {
//         res.status(404).json({ error: "NotFound" })
//     }
//         res.json(conversation)
// }

//---deuxieme version---

// const verifyExistingConversation = async(req, res, next) => {
//     const { id } = req.params

//     const conversation = await Conversation.users.findById(id)

//     if(!conversation) {
//         res.json(conversation)
//     } else {
//         Message.create({
//             conversation
//         })
//     }
// }











module.exports = {
    verifyExistingConversation
}