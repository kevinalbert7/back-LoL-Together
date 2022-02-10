const mongoose = require("mongoose")
const lodash = require("lodash")

const TeamSchema = new mongoose.Schema({
    
    leader_id: {
        type: String,
        required : true, 
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
    languages: [{
        type: String,
    }],
    region: {
        type: String,
    },
    description: {
        type: String,
    },
    disponibilities: [{
        type: String,
    }],
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
})

TeamSchema.post('findOneAndDelete', async team => {
    await mongoose.model('User').findOneAndUpdate(
        { _id: team.user },
        { $pull: { teams: team._id} }
    )
})

TeamSchema.pre('findOneAndUpdate', async function() {
    // const upToDateUsers = this.getUpdate().users
    // const teamId = this.getQuery()._id
    // const team = await mongoose.model('Team').findById(teamId)
    // const currentUsers = team.users.map(u => u.toString())

    // console.log("upToDateUsers", upToDateUsers)
    // console.log("currentUsers", currentUsers)

    // const differenceAdd = lodash.difference(upToDateUsers, currentUsers)
    // // console.log("differenceAdd", differenceAdd)

    // const differenceRemove = lodash.difference(currentUsers, upToDateUsers)
    // console.log("differenceRemove", differenceRemove)

    // if (differenceAdd.length === 1) {
    //     await mongoose.model('User').findOneAndUpdate(
    //         { _id: differenceAdd},
    //         { $push: { teams : team.id } }
    //     )
    // } else {
    //     await mongoose.model('User').findOneAndUpdate(
    //         { _id: differenceRemove},
    //         { $pull: { teams : team.id } }
    //     )
    // }
    
})

const Team = mongoose.model("Team" , TeamSchema)

module.exports = Team