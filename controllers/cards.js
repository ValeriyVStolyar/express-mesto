const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  console.log(req.params)
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен

  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
  // Card.create({ name, link, $addToSet: {owner: req.user._id} })
    .then(card => {
      console.log(card._id);
      res.send({ data: card })
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
  console.log(req.params.cardId)
  Card.findByIdAndDelete(req.params.cardId)
  // Card.findByIdAndRemove(req.params.cardId)
  // Card.findOneAndDelete({ _id: cardId})
  // Card.findOne({ _id: cardId})
  // Card.findById(req.params.cardId)
//  User.find({userId: req.params.userId})
  //  .populate('user')
  //  .then(res.send(req.params))
  //  .then(users => res.send({ data: users }))
    .then(card => {
      console.log('card')
      console.log(card)
      res.send({ data: card })
    })
    .catch(err => res.status(409).send({ message: err.message }));
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)

// module.exports.getCardById = (req, res) => {
//   User.findById(req.params.userId)
// //  User.find({userId: req.params.userId})
//   //  .populate('user')
//   //  .then(res.send(req.params))
//   //  .then(users => res.send({ data: users }))
//     .then(user => {
//       console.log(user)
//       res.send({ data: user })
//     })
//     .catch(err => res.status(409).send({ message: err.message }));
// };