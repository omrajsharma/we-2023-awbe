const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.SERVER_MAIL_ADD,
        pass: process.env.SERVER_MAIL_PWD
    }
})

const sendMail = (to, subject, body) => {
    
    let message = {
        from: process.env.SERVER_MAIL_ADD,
        to: to,
        subject: subject,
        html: body
    }

    transporter.sendMail(message, (err, info) => {
        if(err) {
            console.log('Error occured', err.message);
            return process.exit();
        }

        console.log('Message send: ', info.messageId);
    })
}

const getBuyerEnquiryEmailBody = (reciverName, itemId, senderName, senderEmail, sernderPhone) => {
    return `<div>
        <p>Hi <strong> ${reciverName} </strong></p>
        <p>You have a lead for the property post - <a href=${process.env.FRONTEND_URL + '/item/' + itemId}>Click Here</a></p>
        <p>Name: <strong>${senderName}</strong></p>
        <p>Email: <strong>${senderEmail}</strong></p>
        <p>Phone: <strong>${sernderPhone}</strong></p>
    </div>`
}

module.exports = {sendMail, getBuyerEnquiryEmailBody};