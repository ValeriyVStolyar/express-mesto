const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
  //  .populate('user')
  //  .then(users => res.send({ data: users }))
    .then(users => res.send(req.params))
    .catch(err => res.status(500).send({ message: err.message }));
};

// module.exports.getUsersById = (req, res) => {
//   User.find({})
//   //  .populate('user')
//     .then(res.send(req.params))
//     .then(users => res.send({ data: users }))
//     .catch(err => res.status(500).send({ message: err.message }));
// };

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;  // достанем идентификатор

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: err.message }));
};




const users = require('../models/user.js');
module.exports.getUsersById = (req, res) => {
  res.send(req.params);
}

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