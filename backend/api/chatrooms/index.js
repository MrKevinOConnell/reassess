
'use strict'

const router = require('express').Router()

const { decodeToken, populateUser } = require('../../middleware')
const {
 getChatRoomMessages,
 getChatRooms,
createChatRoom
} = require('./controller')

router.get('/messages/:chatRoomName',getChatRoomMessages)
router.post('/', getChatRooms)
router.post('/', createChatRoom)
module.exports = router
