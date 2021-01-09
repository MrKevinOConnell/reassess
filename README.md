# reassess

## Setup
in your console, type `createdb reassess` to initalize the database
then type `yarn` to install dependencies
## Commands
Within `frontend`, use `yarn start` to have your browser open to http://localhost:3000/

Within `backend`, use `yarn devServer` to set up the backend, as well as enter in migrations needed to initalize the database

## ISSUES
If testing Socket.io, and you come across the error `EADDRINUSE, Address already in use`

Try `pkill nodejs` or `pkill node` if on Linux

