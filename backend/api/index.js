
'use strict'

const router = require('express').Router()
router.use('/lifeCoach', require('./lifeCoach'))
router.use('/chatrooms', require('./chatrooms'))
router.use('/users', require('./user'))
module.exports = router
