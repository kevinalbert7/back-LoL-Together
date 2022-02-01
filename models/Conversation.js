const mongoose = require("mongoose")

const ConversationSchema= new mongoose.Schema({
    
        messages : [{
            type :  mongoose.Schema.Types.ObjectId, ref: "Message",
        }],
        users:[{
            type :  mongoose.Schema.Types.ObjectId, ref: "User",
        }]
    },    
    {
        timestamps: true
    }
)

ConversationSchema.post('save', async function(conversation) {
    await model('User').updateMany(
      { _id:{$in : conversation.users } },
      { $push: { conversations: conversation._id } }
    )
  })

  ConversationSchema.post('findOneAndDelete', async function(conversation) {
    await model('User').updateMany(
      { _id:{$in : conversation.users } },
      { $pull: { conversations: conversation._id} }
    )
  })

const Conversation = mongoose.model("Conversation" , ConversationSchema)

module.exports = Conversation