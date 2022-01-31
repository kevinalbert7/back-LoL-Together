const mongoose = require("mongoose")

const Conversation = new mongoose.Schema({
    
        messages : {
            type : String,
        },
        users:[{
            type :  mongoose.Schema.Types.ObjectId, ref: "User",
        }]
    },    
    {
        timestamps: true
    }
)

const Conversation = mongoose.model("Conversation" , ConversationSchema)

module.exports = Conversation