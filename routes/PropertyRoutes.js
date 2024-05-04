const express = require('express')
const router = express.Router()
const {listProperty, getItems, getItemDetails} = require('../controllers/PropertyController')

router.post('/', listProperty)
router.get('/', getItems)
router.get('/:itemId', getItemDetails)

module.exports = router