io = require('socket.io')();
const Message = require('./models/messageModel');

const auth = require('./middlewares/authMiddleware');
const User = require('./models/userModel');

/**
 * Add auth middleware to socket.io server.
 */
io.use(auth.socket);

io.on('connection', socket => {
  console.log('New client connected: '+socket.id);
  initialData(socket);
});

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