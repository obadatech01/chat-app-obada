io = require('socket.io')();

const auth = require('./middlewares/authMiddleware');

/**
 * Add auth middleware to socket.io server.
 */
io.use(auth.socket);

io.on('connection', socket => {
  console.log('New client connected: '+socket.id);
});
