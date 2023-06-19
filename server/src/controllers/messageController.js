const Message = require("../models/messageModel");
const factory = require("./handlersFactory");

// @desc Get list of messages
// @route GET /api/v1/messages
// @access Public
exports.getMessages = factory.getAll(Message);

// @desc Get specific message by id
// @route GET /api/v1/messages/:id
// @access Public
exports.getMessage = factory.getOne(Message);

// @desc Create message
// @route POST /api/v1/messages
// @access Private/Protect/User
exports.createMessage = factory.createOne(Message);

// @desc Update specific message
// @route PUT /api/v1/messages/:id
// @access Private/Protect/User
exports.updateMessage = factory.updateOne(Message);

// @desc Delete specific message
// @route DELETE /api/v1/messages/:id
// @access Private/Protect/User
exports.deleteMessage = factory.deleteOne(Message);
