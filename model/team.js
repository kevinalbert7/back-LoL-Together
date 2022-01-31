const mongoose = require("mongoose")

const TeamSchema = new mongoose.Schema({
    
        Leader_id : {
            type : String,
        },
        name:{
            type : String,
        },
        logo:{
            type : String,
        },
        rank:{
            type : String,
        },
        languages:{
            type : String,
        },
        region:{
            type : String,
        },
        description:{
            type : String,
        },
        disponibilities:{
            type : String,
        },
        website:{
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

const Team = mongoose.model("Team" , TeamSchema)

module.exports = Team