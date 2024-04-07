const express = require('express')
const router = express.Router()
const {signupUser, loginUser, getProfileInfoByCookie, logout} = require('../controllers/AuthController')

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.get('/profile', getProfileInfoByCookie)
router.get('/logout', logout)

module.exports = router