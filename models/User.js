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
    announcement_id: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Announcement"  
    }],
    conversation_id: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Conversation",
    }],
    team_id: [{
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

UserSchema.post('save', async user => {
    await mongoose.model('Announcement').findOneAndUpdate(
        { _id: user.announcement_id },
        { $push: { users: user._id } }
    )
    await mongoose.model('Conversation').findOneAndUpdate(
        { _id: user.conversation_id },
        { $push: { users: user._id } }
    )
    await mongoose.model('Team').findOneAndUpdate(
        { _id: user.team_id },
        { $push: { users: user._id } }
    )
})

UserSchema.post('findOneAndDelete', async function(user) {
    await mongoose.model('Announcement').findOneAndUpdate(
        { _id: user.announcement_id  },
        { $pull: { users: user._id} }
    )
    await mongoose.model('Conversation').findOneAndUpdate(
        { _id: user.conversation_id  },
        { $pull: { users: user._id} }
    )
    await mongoose.model('Team').findOneAndUpdate(
        { _id: user.team_id  },
        { $pull: { users: user._id} }
    )
})


const User = mongoose.model("User" , UserSchema)

module.exports = User