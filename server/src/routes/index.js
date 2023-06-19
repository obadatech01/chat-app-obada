// Routes
const authRoute = require('./authRoute.js');
const messageRoute = require('./messageRoute.js');

const mountRoutes = (app) => {
  app.use('/api/v1/auth', authRoute);
  app.use('/api/v1/messages', messageRoute);
};

module.exports = mountRoutes;