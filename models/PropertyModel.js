const mongoose = require('mongoose')

const PropertySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        listType: {
            type: String,
            enum: ["SELL", "RENT"],
            required: true
        },
        imgList: {
            type: Array,
            requires: true
        },
        author: {
            type: mongoose.Schema.ObjectId,
            ref: "users",
            required: true
        },
        deleted: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("properties", PropertySchema)