const jwt = require('jsonwebtoken')
const Users = require('../models/UserModel')
const Properties = require('../models/PropertyModel')
const EnquiryEmail = require('../models/EnquiryEmailModel')
const {sendMail, getBuyerEnquiryEmailBody} = require('../utility/EmailUtils')

const listProperty = async (req, res) => {
    const token = req.cookies.token

    if (!token) {
        res.status(401).json({error: "Unauthenticated request"});
        return;
    }

    const {title, location, price, description, imgList, listType} = req.body;

    if( !title || title.length < 5 || title.length > 100) {
        res.status(400).json({error: "Invalid title"})
        return;
    }
    if( !location || location.length < 3 || title.length > 100) {
        res.status(400).json({error: "Invalid location"})
        return;
    }
    if ( !price || price < 0 || price > 1000000000) {
        res.status(400).json({error: "Invalid price"})
        return;
    }
    if (!description || description.length > 1000) {
        res.status(400).json({error: "Invalid description"})
        return;
    }
    if ( !imgList || imgList.length == 0 || imgList.length > 10) {
        res.status(400).json({error: "Invalid imgList"})
        return;
    }
    if (!listType) {
        res.status(400).json({error: "Invalid listType"})
        return;
    }

    try {
        const tokenInfo = jwt.verify(token, process.env.JWT_SECRET)
        const propertyDoc = await Properties.create({
            title,
            location,
            price,
            description,
            imgList,
            listType,
            author: tokenInfo.id
        })
        res.status(201).json({
            message: "Property listed successfully",
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({error: "Internal server error"})
    }
}

const getItems = async (req, res) => {
    const pageNo = req.query.page;
    const type = req.query.type;
    const input = req.query.input;
    const filter = {};
    if (type) {
        filter.listType = type;
    }
    if (input) {
        filter.title = { $regex: "^" + input, $options: "i"}
    }
    const pageSize = 10;
    const skips = (pageNo - 1) * pageSize;
    const responseList = await Properties.find(filter).sort({_id: -1}).skip(skips).limit(pageSize);

    res.status(200).json({
        data: responseList
    })
}

const getItemDetails = async (req, res) => {
    const {itemId} = req.params;
    if (itemId == null || itemId == undefined || itemId.length == 0) {
        res.status(400).json({error: "invalid item id"})
    }

    try {
        const propertyDoc = await Properties.findById(itemId).populate('author', ['name']);
        res.status(200).json({data: propertyDoc})
    } catch (err) {
        res.status(400).json({error: 'Bad request'})
    }
    res.end();
}

const sendLead = async (req, res) => {
    const token = req.cookies.token;
    const {itemId} = req.body;

    if(!token) {
        res.status(400).json({error: "Invalid user"})
        return
    }
    if(!itemId) {
        res.status(400).json({error: "Invalid itemId"})
        return
    }

    try {
        const tokenInfo = jwt.verify(token, process.env.JWT_SECRET);
        const senderUserDoc = await Users.findById(tokenInfo.id);
        const propertyDoc = await Properties.findById(itemId)
        const receiverUserDoc = await Users.findById(propertyDoc.author.toString())

        if (senderUserDoc._id.toString() == receiverUserDoc._id.toString()) {
            res.status(400).json({error: "Can't generate lead for yourself"})
            return
        }

        const equiryDoc = await EnquiryEmail.findOne({
            propertyId: itemId,
            senderId: senderUserDoc._id,
            receiverId: receiverUserDoc._id
        })

        if (equiryDoc) {
            res.status(400).json({error: "Already lead generated"})
            return
        }

        // email send
        sendMail(
            receiverUserDoc.email,
            "Awaas Vishwa - An interested lead for your property ",
            getBuyerEnquiryEmailBody(receiverUserDoc.name, itemId, senderUserDoc.name, senderUserDoc.email, senderUserDoc.phone)
        )

        const equiryDocNew = await EnquiryEmail.create({
            propertyId: itemId,
            senderId: senderUserDoc._id,
            receiverId: receiverUserDoc._id
        })
        res.status(201).json({success: "Lead send to the owner"})
    } catch(err) {
        console.log(err);
        res.status(500).json({error: "Something went wrong"})
    }

    res.end()
}























module.exports = {listProperty, getItems, getItemDetails, sendLead}