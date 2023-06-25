const express = require('express');
const { signup, login, profile } = require('../controllers/authController');
const { auth } = require('../middlewares/authMiddleware');
const { signupValidator, loginValidator } = require('../validations/authValidator');

const router = express.Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
router.post('/profile', auth, profile);

module.exports = router;

