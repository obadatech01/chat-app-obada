const express = require('express');
const { auth, allowedTo } = require('../middlewares/authMiddleware');
const { getMessages, createMessage, getMessage, updateMessage, deleteMessage } = require('../controllers/messageController');
// const { getMessageValidator, updateMessageValidator, deleteMessageValidator, createMessageValidator } = require('../validations/messageValidator');

const router = express.Router();

router.route('/')
  .get(getMessages)
  .post(auth, allowedTo('user'), createMessage);

router.route('/:id')
  .get(getMessage)
  .put(auth, allowedTo('user'), updateMessage)
  .delete(auth, allowedTo('user'), deleteMessage);

module.exports = router;

