const express = require('express')
const router = express.Router()
const {listProperty, getItems} = require('../controllers/PropertyController')

router.post('/', listProperty)
router.get('/', getItems)

module.exports = router