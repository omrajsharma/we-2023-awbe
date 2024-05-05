const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "properties",
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('equiryEmail', UserSchema)