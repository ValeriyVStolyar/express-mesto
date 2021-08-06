const usersRouter = require('express').Router();
const
  {
    getUsers, getUserById, getCurrentUser,
    // createUser,
    updateUser, updateAvatar,
  } = require('../controllers/users');

usersRouter.get('/', getUsers);
usersRouter.get('/:userId', getUserById);
// usersRouter.post('/', createUser);

usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', updateUser);
usersRouter.patch('/me/avatar', updateAvatar);

module.exports = usersRouter;
