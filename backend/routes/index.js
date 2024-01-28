const express = require('express');
const { celebrate } = require('celebrate');
const userRouter = require('./userRoutes');
const cardRouter = require('./cardRoutes');
const { createUserSchema, signInSchema } = require('../validation/validation');
const { login, createUser } = require('../controllers/userController');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', celebrate({ body: createUserSchema }), createUser);
router.post('/signin', celebrate({ body: signInSchema }), login);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

module.exports = router;
