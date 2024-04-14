const express = require('express')
const router = express.Router()
const {listProperty} = require('../controllers/PropertyController')

router.post('/', listProperty)

module.exports = router