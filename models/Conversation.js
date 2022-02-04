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

ConversationSchema.post('save', async conversation => {
  await mongoose.model('User').updateMany(
    { _id:{ $in : conversation.users } },
    { $push: { conversations: conversation._id } }
  )
})

ConversationSchema.post('findOneAndDelete', async conversation => {
  await mongoose.model('User').deleteMany(
    { conversation: {$in : conversation.user } },
    { $pull: { conversations: conversation._id} }
  )
  await mongoose.model('Message').deleteMany(
    { message: {$in : conversation.message } },
    { $pull: { conversations: conversation._id} }
  )
})

const Conversation = mongoose.model("Conversation" , ConversationSchema)

module.exports = Conversation