
'use strict'
const uuid = require('uuid')
const { sequelize, User, LifeCoach} = require('../../models')
const { signToken } = require('../../middleware')

module.exports = {
  getSessionUser,
  loginUser,
  signUpUser,
  updateGoals
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

async function signUpUser(req, res, next) {
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

async function loginUser(req, res, next) {
  try {
     req.transaction = await sequelize.transaction()
    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user) {
      throw new Error('no account made with this email')
    } else if (!user.validPassword(req.body.password)) {
      throw new Error('Incorrect password.')
    } else {
      await req.transaction.commit()
      res.json(user)
    }
  } catch (err) {
    await req.transaction.rollback()
    err.handler = 'login'
    next(err)
  }
}

async function updateGoals(req, res, next) {
  try {
     req.transaction = await sequelize.transaction()
    const { dailyGoals , weeklyGoals, monthlyGoals, yearlyGoals } = req.body
    const user = await User.findOne({ where: { email: req.body.email } })
    user.update({dailyGoals,weeklyGoals,monthlyGoals,yearlyGoals})
    await req.transaction.commit()
    res.json(user)
  } catch (err) {
    await req.transaction.rollback()
    err.handler = 'updateGoals'
    next(err)
  }
}
