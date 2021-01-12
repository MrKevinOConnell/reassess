
'use strict'

const router = require('express').Router()

const { decodeToken, populateUser } = require('../../middleware')
const {
 getChatRoom,
 updateChatRoom,
} = require('./controller')

router.get('/:id/messages',getChatRoom)
router.post('/:id/messages', updateChatRoom)
module.exports = router
