'use strict'

const { app } = require('./app')

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log('Listening on PORT:', PORT)

})
