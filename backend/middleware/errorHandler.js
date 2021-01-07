
'use strict'

module.exports = { errorHandler }

// Global error handler for route handlers
// Note that it needs all four arguments passed to it because that's how express
// determines that it's an error handler.
// eslint-disable-next-line
function errorHandler(err, req, res, next) {
  if (process.env.NODE_ENV !== 'test') {
    console.log('\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n')
    console.log(`Error in ${ err.handler }:`, err.message)
    console.log('\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n')
    console.log('Full Error:')
    console.log('\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n')
    console.log(JSON.stringify(err, null, 2))
    console.log('\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n')
  }
  res.status(400).send(err.message)
}
