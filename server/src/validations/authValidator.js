const { check } = require('express-validator');

const validatorMiddleware = require('../middlewares/validatorMiddleware');
const User = require('../models/userModel');

exports.signupValidator = [
  check('name').notEmpty().withMessage('اسم المستخدم مطلوب!')
  .isLength({min: 3}).withMessage('اسم المستخدم قصير جدا!')
  .isLength({max: 20}).withMessage('يجب ألا يتعدى اسم المستخدم أكثر من 20 حرف'),

  check('email').notEmpty().withMessage('البريد الإلكتروني للمستخدم مطلوب!')
  .isEmail().withMessage('عنوان البريد الإلكتروني غير صالح!')
  .custom((val) =>
    User.findOne({ email: val }).then((user) => {
      if (user) {
        return Promise.reject(new Error('البريد الاليكتروني مستخدم مسبقًا'));
      }
    })
  ),

  check('password').notEmpty().withMessage('كلمة مرور المستخدم مطلوبة!')
  .isLength({min: 6}).withMessage('يجب أن تتكون كلمة المرور من 6 أحرف على الأقل!')
  .custom((password, {req}) => {
    if (password !== req.body.confirmPassword) {
      throw new Error('كلمات المرور غير متطابقة');
    }
    return true;
  }),

  check('confirmPassword').notEmpty().withMessage('مطلوب تأكيد كلمة مرور المستخدم!')
  .isLength({min: 6}).withMessage('يجب أن يتكون تأكيد كلمة المرور من 6 أحرف على الأقل!'),

  validatorMiddleware
];

exports.loginValidator = [
  // check('email').notEmpty().withMessage('البريد الإلكتروني للمستخدم مطلوب!')
  // .isEmail().withMessage('عنوان البريد الإلكتروني غير صالح!'),
  check('user').notEmpty().withMessage('يرجى ادخال اسم المستخدم أو البريد الإلكتروني'),

  check('password').notEmpty().withMessage('كلمة مرور المستخدم مطلوبة!')
  .isLength({min: 6}).withMessage('يجب أن تتكون كلمة المرور من 6 أحرف على الأقل!'),

  validatorMiddleware
];
