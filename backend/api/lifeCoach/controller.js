
'use strict'
const uuid = require('uuid')
const { sequelize, User, LifeCoach} = require('../../models')
const { signToken } = require('../../middleware')

module.exports = {
  getSessionUser,
  loginLifeCoach,
  signUpLifeCoach,
  getUserConvo,
}

async function getSessionUser(req, res, next) {
  try {
     req.transaction = await sequelize.transaction()
    const { email, id } = req.user
    await req.transaction.commit()
    res.cookie('access_token', await signToken(id))
    res.json({ email, id })
  } catch (err) {
    await req.transaction.rollback()
    err.handler = 'getSessionUser'
    next(err)
  }
}

async function signUpLifeCoach(req, res, next) {
  try {
    req.transaction = await sequelize.transaction()
    const { email, password,category } = req.body
    const lifeCoach = await LifeCoach.findOne({ where: { email: req.body.email } })
    const id = uuid.v4()
    if (!lifeCoach) {
    const newLifeCoach = await LifeCoach.create({
      ...req.body,
      email,
      category,
      password,
      id,
      clients: [],
      firstVersionId: id,
    })
    await req.transaction.commit()
    res.json(newLifeCoach)
  }
  else {
    await req.transaction.commit()
    res.json(lifeCoach)
  }
  } catch (err) {
    await req.transaction.rollback()
    err.handler = 'createLifeCoach'
    next(err)
  }
}

async function loginLifeCoach(req, res, next) {
  try {
     req.transaction = await sequelize.transaction()
    const lifeCoach = await LifeCoach.findOne({ where: { email: req.body.email } })
    if (!lifeCoach) {
      throw new Error('no account made with this email')
    } else if (!lifeCoach.validPassword(req.body.password)) {
      throw new Error('Incorrect password.')
    } else {
      await req.transaction.commit()
      res.cookie('access_token', await signToken(lifeCoach.id))
      res.json({ id: lifeCoach.id, clients: lifeCoach.clients,email: lifeCoach.email, firstName: lifeCoach.firstName })
    }
  } catch (err) {
    await req.transaction.rollback()
    err.handler = 'login'
    next(err)
  }
}

async function getUserConvo(req, res, next) {
  try {
     req.transaction = await sequelize.transaction()
    const user = await User.findOne({ where: { id: req.body.id } })
    if (!user) {
      throw new Error('no account with this id');
    } else {
      const convoId = user.chatRoom
      await req.transaction.commit()
      res.json(convoId)
    }
  } catch (err) {
    await req.transaction.rollback()
    err.handler = 'getUserConvo'
    next(err)
  }
}
