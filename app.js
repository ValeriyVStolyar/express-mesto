// const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/users.js');

// Слушаем 3000 порт
const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use('/users', router);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// app.use('/users', require('./routes/users'));
// app.use('/cards', require('./routes/cards'));
// app.use(express.static(path.join(__dirname, 'public'))); // теперь клиент имеет доступ только к публичным файлам
app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})