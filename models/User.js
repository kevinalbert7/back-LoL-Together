const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    
        username : {
            type : String,
            required: true
        },
        password : {
            type : String,
            required : true, 
        },
        email:{
            type : String,
        },
        summoner_name:{
            type : String,
        },
        avatar:{
            type : String,
        },
        rank:{
            type : String,
        },
        discord:{
            type : String,
        },
        email:{
            type : String,
        },
        region:{
            type : String,
        },
        languages:{
            type : String,
        },
        description:{
            type : String,
        },
        disponibilities:{
            type : String,
        },
        roles:[{
            type : String,
        }],
        annonces:[{
            type: mongoose.Schema.Types.ObjectId, ref: "Annonce"  
        }],
        conversations:[{
            type :  mongoose.Schema.Types.ObjectId, ref: "Conversation",
        }],
        website:{
            type : String,
        },
        team:[{
            type :  mongoose.Schema.Types.ObjectId, ref: "Team",
        }] 
    },    
    {
        timestamps: true
    }
)

const User = mongoose.model("User" , UserSchema)

module.exports = User