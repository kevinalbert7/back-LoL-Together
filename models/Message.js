const mongoose = require("mongoose")
// const model Conversation = require("Conversation")

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

MessageSchema.post('save', async message => {
  await mongoose.model('Conversation').findOneAndUpdate(
    { _id: message.conversation },
    { $push: { messages: message._id } }
  )
  //checker si le message a une conversationId
  // si oui j'éxecute ma promesse
  // sinon je créé une conversation
  // je pousse mon message
})

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

const Message = mongoose.model("Message" , MessageSchema)

module.exports = Message