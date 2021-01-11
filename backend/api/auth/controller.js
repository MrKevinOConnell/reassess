
'use strict'
const uuid = require('uuid')
const { sequelize, User } = require('../../models')
const { signToken } = require('../../middleware')

module.exports = {
  getSessionUser,
  login,
  signUp,
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

async function signUp(req, res, next) {
  try {
    req.transaction = await sequelize.transaction()
    const { email, password } = req.body
    const user = await User.findOne({ where: { email: req.body.email } })
    const id = uuid.v4()
    if (!user) {
    const newUser = await User.create({
      ...req.body,
      email,
      password,
      id,
      firstVersionId: id,
    })
    await req.transaction.commit()
    res.json(newUser)
  }
  else {
    await req.transaction.commit()
    res.json(user)
  }
  } catch (err) {
    await req.transaction.rollback()
    err.handler = 'createUser'
    next(err)
  }
}

async function login(req, res, next) {
  try {
     req.transaction = await sequelize.transaction()
    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user) {
      throw new Error('no account made with this email')
    } else if (!user.validPassword(req.body.password)) {
      throw new Error('Incorrect password.')
    } else {
      await req.transaction.commit()
      res.cookie('access_token', await signToken(user.id))
      res.json({ id: user.id, email: user.email, firstName: user.firstName })
    }
  } catch (err) {
    await req.transaction.rollback()
    err.handler = 'login'
    next(err)
  }
}
