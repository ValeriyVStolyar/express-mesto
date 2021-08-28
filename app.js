const crypto = require('crypto'); // экспортируем crypto
// const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const usersRouter = require('./routes/users');
const { login, createUser } = require('./controllers/users');
const cardsRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const NotExistRoutError = require('./errors/route-err');
const errorsHandle = require('./middlewares/errors-handle');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const cookieParser = require('cookie-parser')

// const http = require('http');
// parse urlencoded request bodies into req.body

// //разово для .env напоминалка как генерить
// const randomString = crypto
//   .randomBytes(16) // сгенерируем случайную последовательность 16 байт (128 бит)
//   .toString('hex'); // приведём её к строке

// console.log(randomString); // 5cdd183194489560b0e6bfaf8a81541e

// Слушаем 3000 порт
// const { PORT = 3000, BASE_PATH } = process.env;
const { PORT = 3000 } = process.env;

// const app = connect();

// const cors = require('cors');
const app = express();

require('dotenv').config();
// console.log(process.env.NODE_ENV); // production
// app.use(cors());

app.use(cors);

app.use(helmet());

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.cookieParser());

// app.use((req, res, next) => {
//   req.user = {
//     _id: '610010225b182b6448caf134',
//   };

//   next();
// });

app.get('/posts', (req, res) => {
  console.log(req.cookies.jwt); // достаём токен
});

app.use(requestLogger); // подключаем логгер запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(5),
    }),
  }),
  login);

app.post('/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(5),
    }),
  }),
  createUser);

app.use(auth);

// app.get('/users/me', (req, res) => {
  // console.log('req.userTest');
  // console.log(req.user);
// });

app.use('/users', usersRouter);
// app.use('/cards', cardsRouter);

app.use(() => {
  throw new NotExistRoutError();
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

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(errorsHandle);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // console.log(`App listening on port ${PORT}`);
});
