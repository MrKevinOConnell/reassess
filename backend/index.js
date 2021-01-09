'use strict'

const { app } = require('./app')
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
  // eslint-disable-next-line
  console.log('Listening on PORT:', PORT)
})



let numUsers = 0;

io.on('connection', (socket) => {
  let addedUser = false;
const { id } = socket.client;
  console.log(`User connected: ${id}`);

  // when the client emits 'new message', this listens and executes
  socket.on("chat message", msg => {
  console.log(`${id}: ${msg}`);
  io.emit('chat message',msg)
});

  // when the client emits 'add user', this listens and executes
  socket.on('add user', (username) => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

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

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});