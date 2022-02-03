const mongoose = require("mongoose")

const ConversationSchema = new mongoose.Schema({
    
  messages: [{
    type:  mongoose.Schema.Types.ObjectId, ref: "Message",
  }],
  users: [{
    type:  mongoose.Schema.Types.ObjectId, ref: "User",
  }]
},    
  {
      timestamps: true
  }
)

ConversationSchema.post('save', async conversations => {
  await mongoose.model('User').updateMany(
    { _id:{ $in : conversations.users } },
    { $push: { conversations: conversations._id } }
  )
})

ConversationSchema.post('findOneAndDelete', async conversations => {
  await mongoose.model('User').deleteMany(
    { conversations: {$in : conversations.users } },
    { $pull: { conversations: conversations._id} }
  )
  await mongoose.model('Message').deleteMany(
    { message: {$in : conversations.messages } },
    { $pull: { conversations: conversations._id} }
  )
})

const Conversation = mongoose.model("Conversation" , ConversationSchema)

module.exports = Conversation