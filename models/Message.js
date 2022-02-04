const req = require("express/lib/request")
const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
    
  text: {
      type: String,
  },
  sender: {
      type: mongoose.Schema.Types.ObjectId, ref: "User",
  },
  receiver: {
      type: mongoose.Schema.Types.ObjectId, ref: "User",
  },
  conversation: {
      type: mongoose.Schema.Types.ObjectId, ref: "Conversation",
  }   
},    
  {
      timestamps: true
  }
)

MessageSchema.post('findOneAndDelete', async message => {
  await mongoose.model('User').findOneAndUpdate(
    { _id: message.user },
    { $pull: { messages: message._id} }
  )
  await mongoose.model('Conversation').findOneAndUpdate(
    { _id: message.conversation },
    { $pull: { messages: message._id} }
  )
})

MessageSchema.post('save', async function (message) {
  if (message.conversation) {
    //mise à jour
    //la conversation en poussant le message dans la conversation
    await mongoose.model('Conversation').findOneAndUpdate(
      { _id: message.conversation },
      { $push: { messages: message._id } }
      )
  } else {
    const newConversation = await mongoose.model('Conversation').create({ 
      users: [message.sender, message.receiver],
      messages: [message._id]
     })
    const newConversationID = newConversation._id.toString()

    //  console.log(newConversationID)
    await mongoose.model('User').findOneAndUpdate(
      { _id:{ $in : [message.sender, message.receiver] } },
      { $push: { conversations: message.conversation } }
    )
    await mongoose.model('Message').findOneAndUpdate(
      { _id: message.id  },
      { conversation: newConversationID }
    )
    // créer la conversation
    // avec users: [message.sender, message.receiver]
    // messages: [message._id]

    // update le user en lui mettant la conversation
    // update le message en lui mettant la conversation
  }
})

const Message = mongoose.model("Message" , MessageSchema)

module.exports = Message