const Card = require('../models/card');

const CREATE_OK = 201;
const VALIDATION_ERROR = 400;
const ID_ERROR = 404;
const ERROR_CODE = 500;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(VALIDATION_ERROR)
          .send({
            message: 'Переданы некорректные данные при создании карточки.'
          });
      }
      return res.status(ERROR_CODE)
        .send({
          message: 'Ошибка по умолчанию.'
        });
    });
};

module.exports.createCard = (req, res) => {
  //  console.log(req.user._id); // _id станет доступен

  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(card => {
      res.status(CREATE_OK).send({ data: card })
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(VALIDATION_ERROR)
          .send({
            message: 'Переданы некорректные данные при создании карточки.'
          });
      }
      return res.status(ERROR_CODE)
        .send({
          message: 'Ошибка по умолчанию.'
        });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(new Error('NotValidId'))
    .then(card => {
      res.send({ data: card })
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION_ERROR)
          .send({
            message: 'Невалидный id.'
          });
      } else if (err.message === 'NotValidId') {
        res.status(ID_ERROR)
          .send({
            message: 'Карточка с указанным _id не найдена.'
          });
      }
      res.status(ERROR_CODE)
        .send({
          message: 'Ошибка по умолчанию.'
        });
    });
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  .orFail(new Error('NotValidId'))
  .then((card) => res.send({ data: card }))
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(VALIDATION_ERROR)
        .send({
          message: 'Невалидный id.'
        });
    } else if (err.message === 'NotValidId') {
      res.status(ID_ERROR)
        .send({
          message: 'Карточка с указанным _id не найдена.'
        });
    } else if (err.name === 'ValidationError') {
      return res.status(VALIDATION_ERROR)
        .send({
          message: 'Переданы некорректные данные для постановки лайка.'
        });
    } else return res.status(ERROR_CODE)
      .send({
        message: 'Ошибка по умолчанию.'
      });
  });

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  .orFail(new Error('NotValidId'))
  .then((card) => res.send({ data: card }))
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(VALIDATION_ERROR)
        .send({
          message: 'Невалидный id.'
        });
    } else if (err.message === 'NotValidId') {
      res.status(ID_ERROR)
        .send({
          message: 'Карточка с указанным _id не найдена.'
        });
    } else if (err.name === 'ValidationError') {
      return res.status(VALIDATION_ERROR)
        .send({
          message: 'Переданы некорректные данные для снятии лайка.'
        });
    } else return res.status(ERROR_CODE)
      .send({
        message: 'Ошибка по умолчанию.'
      });
  });
