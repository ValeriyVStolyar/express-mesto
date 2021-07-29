const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  owner: {
    // type: ObjectId, // ссылка на модель автора карточки
    type: String,
    required: true,
  },
  // likes: {
  //   type: ObjectId, // список лайкнувших пост пользователей
  //   required: true,
  //   default: {},
  // },
  // createdAt: {
  //   type: Date, // дата создания
  //   required: true,
  //   default: Date.now,
  // }
});

module.exports = mongoose.model('card', cardSchema);