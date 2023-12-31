const express = require('express');
const { signup, login, profile, password } = require('../controllers/authController');
const { auth } = require('../middlewares/authMiddleware');
const { signupValidator, loginValidator } = require('../validations/authValidator');
const upload = require('./S3');
const router = express.Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
router.post('/profile', auth, upload.single('avatar'), profile);
router.post('/password', auth, password);

module.exports = router;

