const Card = require('../models/card');
const NotFoundIdError = require('../errors/not-found-id-err');
const ValidationError = require('../errors/cast-err');
const WrongDataError = require('../errors/data_err');
const NotPermissionError = require('../errors/permission-err');

const CREATE_OK = 201;

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new WrongDataError('Переданы некорректные данные при создании карточки.');
      }
      next(err);
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  // console.log(req.user._id); // _id станет доступен

  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(CREATE_OK).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new WrongDataError('Переданы некорректные данные при создании карточки.');
      }
      next(err);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(new NotFoundIdError('Карточка с указанным _id не найдена.'))
    .then((card) => {
      // if (card.owner._id !== req.user._id) {
      if(String(card.owner) !== req.user._id) {
        throw new NotPermissionError();
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError();
      }
      next(err);
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  /*
  console.log('req.user in likeCard')
  console.log(req.user)
  console.log('req.user._id')
  console.log(req.user._id)
  console.log('typeof req.user._id')
  console.log(typeof req.user._id)
  console.log('req.params.cardId in likeCard')
  console.log(req.params.cardId)
  */
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(new NotFoundIdError('Карточка с указанным _id не найдена.'))
    .then((card) => {
      // if (card.owner._id !== req.user._id) {
      // if (card.owner !== req.user._id) {
      if (String(card.owner) !== req.user._id) {
        // throw new NotPermissionError();
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError();
      }

      if (err.name === 'ValidationError') {
        throw new WrongDataError('Переданы некорректные данные для постановки лайка.');
      }
      next(err);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(new NotFoundIdError('Карточка с указанным _id не найдена.'))
    .then((card) => {
      // if (card.owner._id !== req.user._id) {
      // if (card.owner !== req.user._id) {
      if (String(card.owner) !== req.user._id) {
        // throw new NotPermissionError();
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidationError();
      }

      if (err.name === 'ValidationError') {
        throw new WrongDataError('Переданы некорректные данные для снятии лайка.');
      }
      next(err);
    })
    .catch(next);
};
