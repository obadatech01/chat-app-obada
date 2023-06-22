const jwt = require('jsonwebtoken');
const asyncHandler = require("../middlewares/asyncHandlerMiddleware");
const User = require("../models/userModel");
const ApiError = require("../utils/apiError");

// @desc make sure the user is logged in
exports.auth = asyncHandler(async (req, res, next) => {
  // 1) check if token exists. if exist get it
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ApiError('You are not login, Please login to get access this route', 401));
  }

  // 2) verify token (no change happen, expire token)
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // console.log(decoded);

  // 3) check if user exists.
  const currentUser = await User.findById(decoded.userId);
  if (!currentUser) {
    return next(new ApiError('The user that belong to this token does no longer exist...', 401));
  }

  req.user = currentUser;
  next();
});

// @desc Authorization (User Permissions)
exports.allowedTo = (...roles) => asyncHandler(async (req, res, next) => {
  // 1) access roles
  // 2) access registered user (req.user.role)
  if (!roles.includes(req.user.role)) {
    return next(new ApiError('You are not allowed to access this route', 403));
  }
  next();
});

/**
 * Socket.io Middleware.
 * @param socket
 * @param next
 */
exports.socket = (socket, next) => {
  if(!socket.handshake.query || !socket.handshake.query.token){
    return next(new ApiError(401, 'auth_error'));
  }

  jwt.verify(socket.handshake.query.token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if(err) return next(new ApiError(401, 'auth_error'));
      User.findById(decoded.userId).then(user => {
          if(!user) return next(new ApiError(401, 'auth_error'));
          socket.user = user;
          next();
      })
      .catch(next);
  })

};