
'use strict'

const { User } = require('../../models')
const { signToken } = require('../../middleware')

module.exports = {
  getSessionUser,
  login,
  signUp,
}

async function getSessionUser(req, res, next) {
  try {
    const { email, id } = req.user
    res.cookie('access_token', await signToken(id))
    res.json({ email, id })
  } catch (err) {
    err.handler = 'getSessionUser'
    next(err)
  }
}

async function signUp(req, res, next) {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email: req.body.email } })
    if (user) throw new Error('account with this email made!')
    const id = uuid.v4()
    const newUser = await User.create({
      ...req.body,
      email,
      password,
      id,
      firstVersionId: id,
    })
    res.json(newUser)
    await user.save()
    res.cookie('access_token', await signToken(user.id))
    res.json({ id: user.id, email: user.email })
  } catch (err) {
    err.handler = 'createUser'
    next(err)
  }
}

async function login(req, res, next) {
  try {
    const user = await User.findOne({ where: { email: req.body.email } })
    if (!user) {
      throw new Error('Somebody already made an account with this email.')
    } else if (!user.validPassword(req.body.password)) {
      throw new Error('Incorrect password.')
    } else {
      res.cookie('access_token', await signToken(user.id))
      res.json({ id: user.id, email: user.email })
    }
  } catch (err) {
    err.handler = 'login'
    next(err)
  }
}
