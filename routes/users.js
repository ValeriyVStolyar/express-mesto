const { celebrate, Joi } = require('celebrate');
const usersRouter = require('express').Router();

const
  {
    getUsers, getUserById, getCurrentUser,
    // createUser,
    updateUser, updateAvatar,
  } = require('../controllers/users');

usersRouter.get('/', getUsers);

usersRouter.get('/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().hex().length(24),
    }),
  }),
  getUserById);
// usersRouter.post('/', createUser);

usersRouter.get('/me', getCurrentUser);

usersRouter.patch('/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(5).max(30),
    }),
  }),
  updateUser);

usersRouter.patch('/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required()
        .pattern(/^https?:\/{2}(w{3}\.)?((((\w+[-]*))*)\.[a-z]{2,6}((\/?\w+\/?){1,9})?|(((\w*\.){1,9}([a-z]){1,6}(\/\w*[-]*){1,9}(\w*)(\.[a-z]+))))(#)?/),
    }),
  }),
  updateAvatar);

module.exports = usersRouter;
