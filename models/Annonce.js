const mongoose = require("mongoose")

const AnnouncementSchema = new mongoose.Schema({
    
        user : {
            type: Schema.Types.ObjectId, ref: "User"
        },
        text:{
            type : String,
        },
        team:{
            type :  mongoose.Schema.Types.ObjectId, ref: "Team",
        },
    },    
    {
        timestamps: true
    }
)

// a tester en bdd
AnnouncementSchema.post('save', async function(announce) {
    await model('User').findOneAndUpdate(
      { _id: announce.user },
      { $push: { announces: announce._id } }
    )
  })

AnnouncementSchema.post('findOneAndDelete', async function(announce) {
    await model('User').findOneAndUpdate(
      { _id: announce.user  },
      { $pull: { announces: announce._id} }
    )
  })
const Announcement = mongoose.model("Announcement" , AnnouncementSchema)

module.exports = Announcement