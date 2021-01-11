
'use strict'

const router = require('express').Router()

const { decodeToken, populateUser } = require('../../middleware')
const {
 getChatRoom,
 updateChatRoom,
} = require('./controller')

router.get('/:chatRoomId/messages',getChatRoom)
router.post('/:chatRoomId/messages', updateChatRoom)
module.exports = router
