const router = require('express').Router();
const { updateUserDataValidation } = require('../utils/validation');
const { getUserData, updateUserData } = require('../conrollers/users');

router.get('/me', getUserData);

router.patch('/me', updateUserDataValidation, updateUserData);

module.exports = router;
