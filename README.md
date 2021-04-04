# Reassess Web Client/Database
This repo is used mostly as a way to run the backend, but also to test features of the app. I don't plan on using the webpage once the app is finished.

## Setup

Assuming you have postgres installed, in your console, type `createdb reassess` to initalize the database
then type `yarn` to install dependencies.
## Commands
Within `frontend`, use `yarn start` to have your browser open to http://localhost:3000/

Within `backend`, use `yarn devServer` to set up the backend, as well as enter in migrations needed to initalize the database

## ISSUES
If testing Socket.io, and you come across the error `EADDRINUSE, Address already in use`

Try `pkill nodejs` or `pkill node` if on Linux

