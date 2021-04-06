
'use strict'
const uuid = require('uuid')
const { sequelize, ChatRoom } = require('../../models')
const { signToken } = require('../../middleware')
const chatroom = require('../../models/chatroom')

module.exports = {
  updateChatRoom,
  getChatRoom,
}

async function updateChatRoom(req, res, next) {
  req.transaction = await sequelize.transaction()
  try {
    const opts = { transaction: req.transaction }
    const id = req.body.id
    const message = req.body.incomingMessage
     const chatRoom = await ChatRoom.findOne({
      where: {
        id: id,
      },
    },opts);
    const messages = chatRoom.messages
    messages.push(message)
      await chatRoom.update({messages: messages})
      await req.transaction.commit()
      res.json(chatRoom.messages)
  } catch (err) {
    await req.transaction.rollback()
    err.handler = 'updateChatRoom'
    next(err)
  }
}

async function getChatRoom(req, res, next) {
  req.transaction = await sequelize.transaction()
  try {
    const opts = { transaction: req.transaction }
  
const id = req.query.id
    const chatRoom = await ChatRoom.findOne({
      where: {
        id: id,
      },
    },opts);
    if(chatRoom) {
      await req.transaction.commit()
    res.json(chatRoom.messages)
    }
    else {
      await ChatRoom.create({id: id, messages: [] })
      await req.transaction.commit()
      res.json([])
    }
  } catch (err) {
    await req.transaction.rollback()
    err.handler = 'getChatRoom'
    next(err)
  }
}
