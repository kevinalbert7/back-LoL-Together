const mongoose = require("mongoose")
const Conversation = require("./Conversation")

const MessageSchema = new mongoose.Schema({
    
  text: {
      type: String,
  },
  sender_id: {
      type: mongoose.Schema.Types.ObjectId, ref: "User",
  },
  receiver_id: {
      type: mongoose.Schema.Types.ObjectId, ref: "User",
  },
  conversation_id: {
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

  // if (message.conversation) {
    // mettre a jour
    //la conversation en poussant le message dans la conversation
  // } else {
    // créer la conversation
    // avec users: [message.sender, message.receiver]
    // messages: [message._id]

    // update le user en lui mettant la conversation
    // update le message en lui mettant la conversation
  // }
})

//------------------------------------------------------

if (message.conversation) {
  await mongoose.model('Conversation').findOneAndUpdate(  
    { _id: message.conversation },
    { $push: { messages: message._id } }
  )

}








MessageSchema.post('findOneAndDelete', async message => {
  await mongoose.model('User').findOneAndUpdate(
    { _id: message.sender_id },
    { $pull: { messages: message._id} },
    { _id: message.sender_id },
    { $pull: { messages: message._id} }
  )
  await mongoose.model('Conversation').findOneAndUpdate(
    { _id: message.conversation_id },
    { $pull: { messages: message._id} }
  )
})

const Message = mongoose.model("Message" , MessageSchema)

module.exports = Message