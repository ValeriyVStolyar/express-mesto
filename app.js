// const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users.js');
const cardsRouter = require('./routes/users.js');

// Слушаем 3000 порт
const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '610010225b182b6448caf134' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
// mongoose.connect('mongodb://localhost:27017/mydb1', {
// mongoose.connect('mongodb://localhost:27017/local', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// app.use('/users', require('./routes/users'));
// app.use('/cards', require('./routes/cards'));
// app.use(express.static(path.join(__dirname, 'public'))); // теперь клиент имеет доступ только к публичным файлам
app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})