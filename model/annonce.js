const mongoose = require("mongoose")

const Announcement = new mongoose.Schema({
    
        user : {
            type : String,
        },
        text:{
            type : String,
        },
        teams:{
            type : String,
        },
    },    
    {
        timestamps: true
    }
)

const Announcement = mongoose.model("Announcement" , AnnouncementSchema)

module.exports = Announcement