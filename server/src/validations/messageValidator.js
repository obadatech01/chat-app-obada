const { check, body } = require('express-validator');
const validatorMiddleware = require('../middlewares/validatorMiddleware');
const User = require('../models/userModel');

exports.getExampleValidator = [
  check('id').isMongoId().withMessage('Invalid example id format!'),
  validatorMiddleware
];

exports.createExampleValidator = [
  check('name').notEmpty().withMessage('Example name is required!'),
  check('user').isMongoId().withMessage('Invalid user id format!')
    .custom((val, {req}) =>
       User.findOne({_id: val})
        .then((user) => {
          if(!user) {
            return Promise.reject(new Error(`There is no user with id: ${val}`))
          }
        })
    ),
  validatorMiddleware
];

exports.updateExampleValidator = [
  check('id').isMongoId().withMessage('Invalid example id format!'),
  body('name').optional(),
  body('user').optional(),
  validatorMiddleware
];

exports.deleteExampleValidator = [
  check('id').isMongoId().withMessage('Invalid example id format!'),
  validatorMiddleware
];
