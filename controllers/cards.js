const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  const { name } = req.body;

  Card.create({ name })
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен

  const { name } = req.body;

  Card.create({ name })
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: err.message }));
};