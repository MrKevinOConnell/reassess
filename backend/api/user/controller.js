
'use strict'
const uuid = require('uuid')
const { sequelize, User, LifeCoach} = require('../../models')
const { signToken } = require('../../middleware')

module.exports = {
  getSessionUser,
  loginLifeCoach,
  signUpLifeCoach,
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
    const { email, password } = req.body
    const lifeCoach = await LifeCoach.findOne({ where: { email: req.body.email } })
    const id = uuid.v4()
    if (!user) {
    const newLifeCoach = await LifeCoach.create({
      ...req.body,
      email,
      password,
      id,
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
    err.handler = 'createUser'
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
      res.json({ id: lifeCoach.id, email: lifeCoach.email, firstName: lifeCoach.firstName })
    }
  } catch (err) {
    await req.transaction.rollback()
    err.handler = 'login'
    next(err)
  }
}
