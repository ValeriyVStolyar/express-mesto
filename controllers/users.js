const User = require('../models/user');
// const models = require('mongoose');

module.exports.getUsers = (req, res) => {
  User.find({})
  //  .populate('user')
    .then(users => {
      console.log(users)
      res.send({ data: users })
    })
  //  .then(users => res.send(req.params))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
//  User.find({userId: req.params.userId})
  //  .populate('user')
  //  .then(res.send(req.params))
  //  .then(users => res.send({ data: users }))
    .then(user => {
      console.log(user)
      res.send({ data: user })
    })
    .catch(err => res.status(409).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;  // достанем идентификатор

  User.create({ name, about, avatar })
  // User.create(req.body)
    console.log(user)
    .then(user => {
      console.log(user)
      res.send({ data: user })
    })
  //  .then((user) => res.status(200).send(user))
    .catch(err => res.status(500).send({ message: err.message }));
};

// module.exports.createUser = (req, res) => {
//   // const { name, age } = req.body;  // достанем идентификатор
//   // console.log(req.body)
//   // const name = "Fedor"
//   // const age = "23"
//   // console.log(name)
//   // console.log({age})

//   // User.create({ name, age })
//   return User.create(req.body)
//     // console.log(user)
//     .then(user => res.send({ data: user }))
//   //  .then((user) => res.status(200).send(user))
//     .catch(err => res.status(500).send({ message: err.message }));
// };



// const { useres } = require('../models/user');

// const useres = [
//       { name: 'Мария', age: 22 },
//       { name: 'Виктор', age: 30 },
//       { name: 'Анастасия', age: 48 },
//       { name: 'Алексей', age: 51 }
//     ]


// module.exports.getUsersById = (req, res) => {
// //  res.send(req.params);
//   // res.send(req.params);
//   // res.send(useres);
//   const { name, age } = User.useres[req.params.userId];
//   res.send(`Имя ${name}, возраст ${age}`);
// }

// module.exports.getUsers = (req, res) => {
//   //res.send(req.params);
//   // const { id, books, list } = req.params;

//   //if (!users[req.params.id]) {
//   //  res.send(`Такого пользователя не существует((`);
//   //  return;
//   //}
//   //res.send('ttt');
//   // const name = 100;
//   // const age = 200;
//   //const { name, age } = users[req.params.id];
//   //res.send(users[req.params.id]);
//   //res.send('ttt');
//   //res.send('console.log(name)');
//   // res.send(console.log(name));
//   // res.send(console.log(age));
//   const { name, age } = users[req.params.id];

//   // res.send(`Пользователь ${id}, ${books} лет ${list}`);
//   res.send(`Пользователь ${name}, ${age} лет`);
// };

// module.exports = router; // экспортировали роутер