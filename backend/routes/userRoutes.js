const express = require('express');

const router = express.Router();
const { celebrate } = require('celebrate');
const userController = require('../controllers/userController');
const {
  updateUserSchema,
  updateAvatarSchema,
  userIdSchema,
} = require('../validation/validation');
const auth = require('../middlewares/auth');

router.get('/', userController.getAllUsers);
router.get('/me', auth, userController.getUserById);
router.get('/:userId', celebrate(userIdSchema), userController.getUserById);
router.patch('/me', celebrate({ body: updateUserSchema }), userController.updateProfile);
router.patch('/me/avatar', celebrate({ body: updateAvatarSchema }), userController.updateAvatar);

module.exports = router;
