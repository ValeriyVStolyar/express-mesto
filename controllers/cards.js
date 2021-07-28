const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен

  const { name, link } = req.body;

  Card.create({ name, link })
    .then(card => {
      console.log(card._id);
      res.send({ data: card })
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  Card.delete(req.params.cardId)
//  User.find({userId: req.params.userId})
  //  .populate('user')
  //  .then(res.send(req.params))
  //  .then(users => res.send({ data: users }))
    .then(card => {
      console.log(card)
      res.send({ data: card })
    })
    .catch(err => res.status(409).send({ message: err.message }));
};