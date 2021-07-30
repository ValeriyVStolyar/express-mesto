const usersRouter = require('express').Router();
const
  {
    getUsers, getUserById, createUser,
    updateUser, updateAvatar
  }
    = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
usersRouter.post('/', createUser);

usersRouter.patch('/me', updateUser); // обновляет профиль
usersRouter.patch('/me/avatar', updateAvatar); // обновляет аватар

module.exports = usersRouter;
