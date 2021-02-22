
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
const cookieParser = require('cookie-parser')

const {
  errorHandler,
} = require('./middleware')

const app = express()
var http = require('http').createServer(app);

// Request logging middleware
// Body parsing middleware -- turns binary into JS objects
app.use(bodyParser.json())
app.use(cookieParser())

app.use(express.static(path.join(__dirname, '../')))

app.use('/api', require('./api'))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
app.use(errorHandler)

const PORT = process.env.PORT || 8080
http.listen(PORT, () => {
  // eslint-disable-next-line
  console.log('Listening on PORT:', PORT)
})
var io = require('socket.io')(http, {
  cors: {
    origin: "*",
  },
});

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";


io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  // Join a conversation
  socket.on('join', socketId => {
       socket.join(socketId);
   });

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    console.log('message',data)
    io.in(data.roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", socketId => {
    console.log(`Client ${socket.id} diconnected`);
    socket.leave(socketId);
  });
});

//listening stuff

/* 
// when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', () => {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });
  */