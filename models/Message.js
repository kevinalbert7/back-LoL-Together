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
            type : String,
        }   
    },    
    {
        timestamps: true
    }
)

const Message = mongoose.model("Message" , MessageSchema)

module.exports = Message