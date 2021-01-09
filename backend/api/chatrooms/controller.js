
'use strict'
const uuid = require('uuid')
const { sequelize, User } = require('../../models')
const { signToken } = require('../../middleware')

module.exports = {
  getChatRooms,
  createChatRoom,
  getChatRoomMessages,
}

async function getChatRooms(req, res, next) {
  try {
  const chatRooms = await models.ChatRoom.findAll();
  res.json(chatRooms);
  } catch (err) {
    err.handler = 'getChatrooms'
    next(err)
  }
}

async function createChatRoom(req, res, next) {
  try {
    const room = req.body.room;
    const chatRooms = await models.ChatRoom.findAll({
    where: { name: room },
  });
  const chatRoom = chatRooms[0];
  if (!chatRoom) {
    await models.ChatRoom.create({ name: room });
  }
  res.json(chatRooms);
  } catch (err) {
    err.handler = 'createChatRoom'
    next(err)
  }
}

async function getChatRoomMessages(req, res, next) {
  try {
const chatRoomName = req.params.chatRoomName;
    const chatRooms = await models.ChatRoom.findAll({
      where: {
        name: chatRoomName,
      },
    });
     const chatRoomId = chatRooms[0].id;
    const messages = await models.ChatMessage.findAll({
      where: {
        chatRoomId,
      },
    });
    res.json(messages)
  } catch (err) {
    err.handler = 'login'
    next(err)
  }
}
