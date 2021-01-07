
'use strict'

const router = require('express').Router()
router.use('/auth', require('./auth'))
console.log('dirname',__dirname)
module.exports = router
