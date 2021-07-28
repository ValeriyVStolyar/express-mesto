const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    // required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('user', userSchema);

// const userSchema = new mongoose.Schema({
//   name: { // у пользователя есть имя — опишем требования к имени в схеме:
//     type: String, // имя — это строка
//     // required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
//     minlength: 2, // минимальная длина имени — 2 символа
//     maxlength: 30, // а максимальная — 30 символов
//   },
//   age: {
//     type: String,
//   },
// });


// module.exports = useres = 100;
// module.exports = {
//   useres: [
//     { name: 'Мария', age: 22 },
//     { name: 'Виктор', age: 30 },
//     { name: 'Анастасия', age: 48 },
//     { name: 'Алексей', age: 51 }
//   ]
// };


// {
//   "name": "Тестовый пользователь",
//   "about": "О себе",
//   "avatar": "https://images.unsplash.com/photo-1627130680454-62593ccd034f?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
// }