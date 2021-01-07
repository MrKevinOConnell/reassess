
'use strict'

const router = require('express').Router()

const { decodeToken, populateUser } = require('../../middleware')
const {
  getSessionUser,
  signUp,
  login,
} = require('./controller')

router.get('/session', decodeToken, populateUser, getSessionUser)
router.post('/signup', signUp)
router.post('/login', login)
module.exports = router
