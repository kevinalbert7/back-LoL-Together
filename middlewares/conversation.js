const Conversation = require("../models/Conversation")
const Message = require("../models/Message")

//middleware qui vérifie si la conversation entre 2 pesronnes existe

// 1 Avoir l'Id de la personne connectée
// 2 Avoir l'Id de la personne qui recoit le message
// 3 Chercher une conversation qui, dans sa clé users a les 2 Id des participants

// Condition :
// -si j'ai une conversation, alors je renvoie l'Id
// -sinon je next() et je la créé au post de message

const verifyExistingConversation = (req, res, next) => {
    const getUserConnected = req.user
    const { receiverId } = req.body
    const conversation = findOne({ users: [getUserConnected.id] })
     
}






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