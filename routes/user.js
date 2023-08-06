const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { getUserData, updateUserData } = require('../conrollers/users');

router.get('/me', getUserData);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), updateUserData)

module.exports = router;
