
'use strict'

const router = require('express').Router()
router.use('/auth', require('./auth'))
router.use('/chatrooms', require('./chatrooms'))
module.exports = router
