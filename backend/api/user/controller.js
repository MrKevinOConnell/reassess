
'use strict'
const uuid = require('uuid')
const { sequelize, User, LifeCoach} = require('../../models')
const { signToken } = require('../../middleware')
const Sequelize = require('sequelize');
const { first } = require('lodash');
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
    const { email, password, category,firstName} = req.body
    console.log(category)
    const user = await User.findOne({ where: { email: req.body.email } })
    const id = uuid.v4()
    if (!user) {
    const lifeCoaches = await LifeCoach.findAll({ where: {category: category}, order: Sequelize.literal('random()'), limit: 1 })
    const categoryLifeCoach = lifeCoaches[0];
  
      console.log("coach id",categoryLifeCoach.id)
      console.log("coach clients",categoryLifeCoach.clients)
       if(!categoryLifeCoach) {
         throw Error("No life coach in this category.")
       }
    const chatId = [id, categoryLifeCoach.id].sort().join(',');
    const newUser = await User.create({
      ...req.body,
      email,
      password,
      id,
      category,
      lifeCoach: categoryLifeCoach.id,
      chatRoom: chatId,
    })

  const clients = categoryLifeCoach.clients
    clients.push({firstName,id,chatId})
    await categoryLifeCoach.update({clients: clients})
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
