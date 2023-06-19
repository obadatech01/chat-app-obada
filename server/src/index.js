
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const ApiError = require('./utils/apiError');
const globalError = require('./middlewares/errorMiddleware');
const connectDB = require('./db/databaseConfig');
// Routes
const mountRoutes = require('./routes/index');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

// Connect with db
connectDB();

// express app
const app = express();

const corsOptions = {
  origin: '*',
  optionSuccessStatus: 200
}

app.use(cors(corsOptions))


/**
 * Express Middleware's.
 */
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode : ${process.env.NODE_ENV}`);
}

/**
 * Mount Routes.
 */
mountRoutes(app);

/**
 * Errors handling
 */
app.all('*', (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400))
});

// Global error handling middleware for express
app.use(globalError);
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running at ${PORT}`);
});

// Event to listen for handle any errors from out express
// Handle rejections outside express
process.on('unhandledRejection', (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => { // because checked to finish all requests then close then exit
    console.error('Shutting down...');
    process.exit(1);
  });
});