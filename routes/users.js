const router = require('express').Router();
const { getUsers, getUsersById, createUser } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUsersById);
router.post('/', createUser);
// router.post('/', createUser);



module.exports = router;


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