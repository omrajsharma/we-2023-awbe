const express = require('express')
const router = express.Router()
const {signupUser, loginUser} = require('../controllers/AuthController')

router.post('/signup', signupUser)
router.post('/login', loginUser)

module.exports = router