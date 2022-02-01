const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema({
    
        text : {
            type : String,
        },
        sender : {
            type :  mongoose.Schema.Types.ObjectId, ref: "User",
        },
        receiver : {
            type :  mongoose.Schema.Types.ObjectId, ref: "User",
        },
        conversation : {
            type :  mongoose.Schema.Types.ObjectId, ref: "Conversation",
        }   
    },    
    {
        timestamps: true
    }
)
MessageSchema.post('save', async function(message) {
    await model('Conversation').findOneAndUpdate(
      { _id: message.conversation },
      { $push: { messages: conversation._id } }
    )
  })
  MessageSchema.post('findOneAndDelete', async function(message) {
    await model('User').findOneAndUpdate(
      { _id: message.conversation  },
      { $pull: { messages: conversation._id} }
    )
  })

const Message = mongoose.model("Message" , MessageSchema)

module.exports = Message