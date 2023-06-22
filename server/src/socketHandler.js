io = require('socket.io')();
const Message = require('./models/messageModel');

const auth = require('./middlewares/authMiddleware');
const User = require('./models/userModel');
const users = {};

/**
 * Add auth middleware to socket.io server.
 */
io.use(auth.socket);

/**
 * Handle new connections.
 */
io.on('connection', socket => {
  // Handle new connection event.
  onSocketConnected(socket);
  // Handle user-to-user message.
  socket.on('message', data => onMessage(socket, data));
  console.log('New client connected: '+socket.id);
  initialData(socket);
  // Handle Socket disconnect event.
  socket.on('disconnect', () => onSocketDisconnected(socket));
});

/**
 * Handle new connection event.
 * @param socket
 */
const onSocketConnected = socket => {
  // Log socket.id to console.
  console.log('New client connected: ' + socket.id);
  // Add newly connected socket to user room.
  socket.join(socket.user.id);
  // Make user status online.
  users[socket.user.id] = true;
  // If this connection is the first one for user then broadcast user online to others.
  let room = io.sockets.adapter.rooms[socket.user.id];
  if(!room || room.length === 1){
    io.emit('user_status', {
      [socket.user.id]: true
    })
  }
};

/**
 * Handle socket disconnection.
 * @param socket
 */
const onSocketDisconnected = socket => {
    // If last connection for user then broadcast user last seen to others.
    let room = io.sockets.adapter.rooms[socket.user.id];
    if(!room || room.length < 1){
        let lastSeen = new Date().getTime();
        users[socket.user.id] = lastSeen;
        io.emit('user_status', {
            [socket.user.id]: lastSeen
        });
    }
    // Log user disconnected to console.
    console.log('Client disconnected: ' + socket.user.username);
};

const onMessage = (socket, data) => {
  let sender = socket.user.id;
  let receiver = data.receiver;
  let message = {
    sender: sender, receiver: receiver, content: data.content, data: new Date().getTime()
  }

  Message.create(message);
  socket.to(sender).to(receiver).emit('message', message);
}

const getMessages = userId => {
  let where = [
    {sender: userId}, {receiver: userId}
  ]

  return Message.find().or(where);
}

const getUsers = userId => {
  let where = {_id: { $ne: userId } }

  return User.find(where).select('-password');
}

const initialData = socket => {
  let user = socket.user;
  let messages = [];
  getMessages(user.id)
  .then(data => {
    messages = data;
    return getUsers(user.id);
  })
  .then(contacts => {
    socket.emit('data', user, contacts, messages);
  })
  .catch(() => socket.disconnect());
};