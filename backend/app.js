
'use strict'

const path = require('path')

const dotenvConfig = process.env.NODE_ENV === 'test'
  ? { path: path.resolve(process.cwd(), '.env.test') }
  : { path: path.resolve(process.cwd(), '.env') }

require('dotenv').config(dotenvConfig)
// Default NODE_ENV to development if none is set
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const {
  errorHandler,
} = require('./middleware')

const app = express()

// Request logging middleware
if (process.env.NODE_ENV !== 'test') {
  // You may want to move this out of the conditional when debugging test failures.
  app.use(morgan('dev'))
}
// Body parsing middleware -- turns binary into JS objects
app.use(bodyParser.json())
app.use(cookieParser())

app.use(express.static(path.join(__dirname, '../build')))
app.use('/api', require('./api'))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'))
})

app.use(errorHandler)

module.exports = { app }
