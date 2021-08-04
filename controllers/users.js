const User = require('../models/user');

const CREATE_OK = 201;
const VALIDATION_ERROR = 400;
const ID_ERROR = 404;
const ERROR_CODE = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => {
      if (err.message === 'ValidationError') {
        res.status(VALIDATION_ERROR)
          .send({
            message: 'Переданы некорректные данные при создании пользователя.',
          });
      }
      res.status(ERROR_CODE)
        .send({
          message: 'Ошибка по умолчанию.',
        });
    });
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(VALIDATION_ERROR)
          .send({
            message: 'Невалидный id.',
          });
      } else if (err.message === 'NotValidId') {
        res.status(ID_ERROR)
          .send({
            message: 'Пользователь по указанному _id не найден.',
          });
      } else {
        res.status(ERROR_CODE)
          .send({
            message: 'Ошибка по умолчанию.',
          });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body; // достанем идентификатор
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(CREATE_OK).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(VALIDATION_ERROR)
          .send({
            message: 'Переданы некорректные данные при создании пользователя.',
          });
      }
      return res.status(ERROR_CODE)
        .send({
          message: 'Ошибка по умолчанию.',
        });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body; // достанем идентификатор
  User.findByIdAndUpdate(
    req.user._id, { name, about }, { new: true, runValidators: true },
  )
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(VALIDATION_ERROR)
          .send({
            message: 'Невалидный id.',
          });
      } if (err.message === 'NotValidId') {
        return res.status(ID_ERROR)
          .send({
            message: 'Пользователь по указанному _id не найден.',
          });
      } if (err.name === 'ValidationError') {
        return res.status(VALIDATION_ERROR)
          .send({
            message: 'Переданы некорректные данные при обновлении профиля.',
          });
      } if (err.name === 'IdError') {
        return res.status(ID_ERROR)
          .send({
            message: 'Пользователь с указанным _id не найден.',
          });
      }
      return res.status(ERROR_CODE)
        .send({
          message: 'Ошибка по умолчанию.',
        });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body; // достанем идентификатор
  User.findByIdAndUpdate(
    req.user._id, { avatar }, { new: true, runValidators: true },
  )
    .orFail(new Error('NotValidId'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return res.status(VALIDATION_ERROR)
          .send({
            message: 'Невалидный id.',
          });
      } if (err.message === 'NotValidId') {
        return res.status(ID_ERROR)
          .send({
            message: 'Пользователь по указанному _id не найден.',
          });
      } if (err.name === 'ValidationError') {
        return res.status(VALIDATION_ERROR)
          .send({
            message: 'Переданы некорректные данные при обновлении аватара.',
          });
      } if (err.name === 'IdError') {
        return res.status(ID_ERROR)
          .send({
            message: 'Пользователь с указанным _id не найден.',
          });
      }
      return res.status(ERROR_CODE)
        .send({
          message: 'Ошибка по умолчанию.',
        });
    });
};
