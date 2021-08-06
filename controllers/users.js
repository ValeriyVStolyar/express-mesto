const User = require('../models/user');
const validator = require('validator');
const bcrypt = require('bcrypt');

const CREATE_OK = 201;
const VALIDATION_ERROR = 400;
const NOTVACANT_ERROR = 403;
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

// module.exports.createUser = (req, res) => {
//   const { name, about, avatar, email, password } = req.body; // достанем идентификатор
//   User.create({ name, about, avatar, email, password })
//     .then((user) => {
//       res.status(CREATE_OK).send({ data: user });
//     })
//     .catch((err) => {
//       if (err.name === 'ValidationError') {
//         return res.status(VALIDATION_ERROR)
//           .send({
//             message: 'Переданы некорректные данные при создании пользователя.',
//           });
//       }
//       return res.status(ERROR_CODE)
//         .send({
//           message: 'Ошибка по умолчанию.',
//         });
//     });
// };

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body; // достанем идентификатор
  if (!email || !password) {
    return res.status(VALIDATION_ERROR)
      .send({
        message: 'email or password are not should be empty.',
      });
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.status(NOTVACANT_ERROR)
          .send({
            message: 'This user already exist.',
          });
      } else {
        bcrypt.hash(password, 10)
          .then((hash) => {
            User.create({ name, about, avatar, email, password: hash })
              .then((user) => {
                res.status(CREATE_OK).send({ data: user.toJSON() });
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
          })
      }
    })
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        // хеши не совпали — отклоняем промис
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      // аутентификация успешна
      res.send({ message: 'Всё верно!' });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
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

// module.exports.login = (req, res) => {
//   const {name, email, password} = req.body;
//   if(!email || !password) {
//     return res.status(VALIDATION_ERROR)
//     .send({
//       message: 'email or password are not should be empty.',
//     });
//   }
//   User.findOne({ email })
//     .then((user) => {
//       if (user) {
//         return res.status(NOTVACANT_ERROR)
//           .send({
//             message: 'This user already exist.',
//           });
//       } else {
//         bcrypt.hash(password, 10)
//           .then(hash => {
//             User.create({
//               name,
//               email,
//               password: hash,
//             })
//             .then((user) => {
//               res.send({ data: user });
//             })
//             .catch((err) => {
//               if (err.message === 'ValidationError') {
//                 res.status(VALIDATION_ERROR)
//                   .send({
//                     message: 'Переданы некорректные данные при создании пользователя.',
//                   });
//               }
//               res.status(ERROR_CODE)
//                 .send({
//                   message: 'Ошибка по умолчанию.',
//                 });
//             });
//           })
//       }
//     })
//     // .catch((err) => {
//     //   if (err.message === 'ValidationError') {
//     //     res.status(VALIDATION_ERROR)
//     //       .send({
//     //         message: 'Переданы некорректные данные при создании пользователя.',
//     //       });
//     //   }
//     //   res.status(ERROR_CODE)
//     //     .send({
//     //       message: 'Ошибка по умолчанию.',
//     //     });
//     // });
// };
