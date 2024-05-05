const express = require('express')
const router = express.Router()
const {listProperty, getItems, getItemDetails, sendLead} = require('../controllers/PropertyController')

router.post('/', listProperty)
router.get('/', getItems)
router.get('/:itemId', getItemDetails)
router.post('/lead', sendLead)

module.exports = router