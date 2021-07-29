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


// router.js
// const router = require('express').Router(); // создали роутер
// //const { getUsers } = require('../models/user.js'); // данные нужны для роутинга, поэтому импортируем их
// const { getUsers } = require('../controllers/users.js'); // данные нужны для роутинга, поэтому импортируем их

// //router.get('/users/:id/books/:books/:list', getUsers);
// router.get('/users/:id', getUsers);

// // router.get('/users/:id', (req, res) => {
// //   if (!users[req.params.id]) {
// //     res.send(`Такого пользователя не существует`);
// //     return;
// //   }

// //   const { name, age } = users[req.params.id];

// //   res.send(`Пользователь ${name}, ${age} лет`);
// // });

// module.exports = router; // экспортировали роутер