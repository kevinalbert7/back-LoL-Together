const mongoose = require("mongoose")

const AnnouncementSchema = new mongoose.Schema({
    
        user : {
            type: mongoose.Schema.Types.ObjectId, ref: "User"
        },
        text : {
            type : String,
        },
        team : {
            type : mongoose.Schema.Types.ObjectId, ref: "Team",
        },
    },    
    {
        timestamps: true
    }
)

// a tester en bdd
AnnouncementSchema.post('save', async announcements => {
  await mongoose.model('User').findOneAndUpdate(
    { _id: announcements.user },
    { $push: { announcements: announcements._id } }
  )
  await mongoose.model('Team').findOneAndUpdate(
    { _id: announcements.team },
    { $push: { announcements: announcements._id } }
  )
})

AnnouncementSchema.post('findOneAndDelete', async announcements => {
  await mongoose.model('User').findOneAndUpdate(
    { _id: announcements.user },
    { $pull: { announcements: announcements._id} }
  )
  await mongoose.model('Team').findOneAndUpdate(
    { _id: announcements.team },
    { $pull: { announcements: announcements._id} }
  )
})

const Announcement = mongoose.model("Announcement" , AnnouncementSchema)

module.exports = Announcement