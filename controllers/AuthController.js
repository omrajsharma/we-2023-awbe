const bcrypt = require('bcryptjs');
const Users = require('../models/UserModel');
const { log } = require('../utility/AppUtils');

const salt = bcrypt.genSaltSync(10);
const phoneFormat = /^[6-9]\d{9}$/;
const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const usernameFormat = /^[a-zA-Z0-9]{1,30}$/;
const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

const signupUser = async (req, res) => {
    const {name, phone, email, username, password} = req.body;
    
    if (name?.length < 2 || name?.length > 50) {
        res.status(400).json({error: "Name should be greater than 1 and less than equal 50 characters"})
        return;
    }
    if (!phoneFormat.test(phone)) {
        res.status(400).json({error: "Invalid phone number"})
        return;
    }
    if (!emailFormat.test(email)) {
        res.status(400).json({error: "Invalid email"})
        return;
    }
    if (!usernameFormat.test(username)) {
        res.status(400).json({error: "Invalid username"})
        return;
    }
    if (!passwordFormat.test(password)) {
        res.status(400).json({error: "Invalid password"})
        return;
    }

    try {
        const userByUsername = await Users.findOne({username: username})
        if (userByUsername) {
            res.status(400).json({error: "Username already used"})
            return;
        }
        const userByEmail = await Users.findOne({email: email})
        if (userByEmail) {
            res.status(400).json({error: "Email already used"})
            return;
        }
        const userByPhone = await Users.findOne({phone: phone})
        if (userByPhone) {
            res.status(400).json({error: "phone already used"})
            return;
        }
        const user = await Users.create({name, phone, email, username, password: bcrypt.hashSync(password, salt)})
        res.status(201).json(user)
    } catch (err) {

    }

    res.end('signup done by om')
}

module.exports = {signupUser}