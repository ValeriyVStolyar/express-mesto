const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const EmailOrPasswordError = require('../errors/email-password-err');

const userSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    // required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    // required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    match: /^https?:\/{2}(w{3}\.)?((((\w+[-]*))*)\.[a-z]{2,6}((\/?\w+\/?){1,9})?|(((\w*\.){1,9}([a-z]){1,6}(\/\w*[-]*){1,9}(\w*)(\.[a-z]+))))(#)?/gmi,
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    select: false,
  },
});

function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}

userSchema.methods.toJSON = toJSON;

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new EmailOrPasswordError());
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new EmailOrPasswordError());
          }
          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema);
