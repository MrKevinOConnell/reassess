
'use strict'

const router = require('express').Router()

const { decodeToken, populateUser } = require('../../middleware')
const {
  getSessionUser,
  signUpLifeCoach,
  loginLifeCoach,
} = require('./controller')

router.get('/session', decodeToken, populateUser, getSessionUser)
router.post('/signup', signUpLifeCoach)
router.post('/login', loginLifeCoach)
module.exports = router
