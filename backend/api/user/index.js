
'use strict'

const router = require('express').Router()

const { decodeToken, populateUser } = require('../../middleware')
const {
  getSessionUser,
  signUpUser,
  loginUser,
  updateGoals
} = require('./controller')

router.get('/session', decodeToken, populateUser, getSessionUser)
router.post('/signup', signUpUser)
router.post('/login', loginUser)
router.post('/:id/goals', updateGoals)
module.exports = router
