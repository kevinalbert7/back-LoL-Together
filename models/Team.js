const mongoose = require("mongoose")

const TeamSchema = new mongoose.Schema({
    
    Leader_id: {
        type: String,
    },
    name: {
        type: String,
    },
    logo: {
        type: String,
    },
    rank: {
        type: String,
    },
    languages: {
        type: String,
    },
    region: {
        type: String,
    },
    description: {
        type: String,
    },
    disponibilities: {
        type: String,
    },
    website: {
        type: String,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId, ref: "User",
    }],
    announcements: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Announcement",
    }],
},    
    {
        timestamps: true
    }
)

TeamSchema.post('save', async team => {
    await mongoose.model('User').findOneAndUpdate(
        { _id: team.users },
        { $push: { teams: team._id } }
    )
    await mongoose.model('Announcement').findOneAndUpdate(
        { _id: team.announcements },
        { $push: { teams: announcements._id } }
      )
})

TeamSchema.post('findOneAndDelete', async team => {
    await mongoose.model('User').findOneAndUpdate(
        { _id: team.user },
        { $pull: { teams: team._id} }
    )
    await mongoose.model('Announcement').findOneAndUpdate(
        { _id: team.announcements },
        { $pull: { teams: team._id} }
    )
  })

const Team = mongoose.model("Team" , TeamSchema)

module.exports = Team