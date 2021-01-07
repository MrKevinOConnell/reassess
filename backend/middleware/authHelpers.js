
'use strict'

const _ = require('lodash')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

const { JWT_SECRET } = process.env
// 3 days in minutes
const EXPIRE_TIME = 3 * 24 * 60 * 60
const checkToken = expressJwt({ secret: JWT_SECRET, algorithms: [ 'HS256' ] })
const { AdminUser } = require('../models')

module.exports = {
  decodeToken,
  signToken,
  populateUser,
}

function decodeToken(req, res, next) {
  // Set the bearer token from the cookies.
  req.headers.authorization = `Bearer ${ _.get(req, 'cookies.access_token', '') }`
  checkToken(req, res, next)
}

async function populateUser(req, res, next) {
  try {
    req.user = await AdminUser.findByPk(req.user.id)
    next()
  } catch (err) {
    err.handler = 'populateUser'
    next({ error: err })
  }
}

function signToken(id) {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: EXPIRE_TIME })
}
