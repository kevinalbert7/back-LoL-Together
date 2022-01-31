const mongoose = require("mongoose")

const Message = new mongoose.Schema({
    
        text : {
            type : String,
        },
        sender : {
            type : String,
        },
        receiver : {
            type : String,
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