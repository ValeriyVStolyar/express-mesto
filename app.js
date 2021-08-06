// const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const usersRouter = require('./routes/users');
const { login, createUser } = require('./controllers/users');
const cardsRouter = require('./routes/cards');

const ROUT_ERROR = 404;

// Слушаем 3000 порт
// const { PORT = 3000, BASE_PATH } = process.env;
const { PORT = 3000 } = process.env;
const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '610010225b182b6448caf134', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
// app.use('/*', errorRouter);

app.use((req, res) => {
  res.status(ROUT_ERROR).send({ message: 'Был запрошен несуществующий роут' });
});

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// app.use(express.static(path.join(__dirname, 'public')));
// теперь клиент имеет доступ только к публичным файлам

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // console.log(`App listening on port ${PORT}`);
});
