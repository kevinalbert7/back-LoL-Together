const mongoose = require("mongoose")

const AnnouncementSchema = new mongoose.Schema({
    
  user: {
      type: mongoose.Schema.Types.ObjectId, ref: "User"
  },
  text: {
      type: String,
  },
  team: {
      type: mongoose.Schema.Types.ObjectId, ref: "Team",
  },
},    
  {
      timestamps: true
  }
)

// a tester en bdd
AnnouncementSchema.post('save', async announcement => {
  await mongoose.model('User').findOneAndUpdate(
    { _id: announcement.user },
    { $push: { announcements: announcement._id } }
  )
  await mongoose.model('Team').findOneAndUpdate(
    { _id: announcement.team },
    { $push: { announcements: announcement._id } }
  )
})

AnnouncementSchema.post('findOneAndDelete', async announcement => {
  await mongoose.model('User').findOneAndUpdate(
    { _id: announcement.user },
    { $pull: { announcements: announcement._id} }
  )
  await mongoose.model('Team').findOneAndUpdate(
    { _id: announcement.team },
    { $pull: { announcements: announcement._id} }
  )
})

const Announcement = mongoose.model("Announcement" , AnnouncementSchema)

module.exports = Announcement