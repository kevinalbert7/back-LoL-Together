const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    
    username: {
        type : String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required : true, 
    },
    email: {
        type: String,
    },
    summoner_name: {
        type: String,
        required: true
    },
    summoner_infos: {
        type: Object,
    },
    avatar: {
        type: String,
    },
    discord: {
        type: String,
    },
    email: {
        type: String,
    },
    region: {
        type: String,
    },
    languages: {
        type: String,
    },
    description: {
        type: String,
    },
    disponibilities: {
        type: String,
    },
    roles: [{
        type: String,
    }],
    announcements: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Announcement"  
    }],
    conversations: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Conversation",
    }],
    teams: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Team",
    }], 
    website: {
        type: String,
    }
},    
    {
        timestamps: true
    }
)

UserSchema.post('save', async function(user) {
    await mongoose.model('Announcement').findOneAndUpdate(
        { _id: user.announcements },
        { $push: { users: user._id } }
    )
    await mongoose.model('Conversation').findOneAndUpdate(
        { _id: user.conversations },
        { $push: { users: user._id } }
        )
    await mongoose.model('Team').findOneAndUpdate(
        { _id: user.teams },
        { $push: { users: user._id } }
        )
})

UserSchema.post('findOneAndDelete', async function(user) {
    await mongoose.model('Announcement').findOneAndUpdate(
        { _id: user.announcements  },
        { $pull: { users: user._id} }
    )
    await mongoose.model('Conversation').findOneAndUpdate(
        { _id: user.conversations  },
        { $pull: { users: user._id} }
    )
    await mongoose.model('Team').findOneAndUpdate(
        { _id: user.teams  },
        { $pull: { users: user._id} }
    )
})


const User = mongoose.model("User" , UserSchema)

module.exports = User