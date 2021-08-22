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

// const http = require('http');
// parse urlencoded request bodies into req.body

// const ROUT_ERROR = 404;

// Слушаем 3000 порт
// const { PORT = 3000, BASE_PATH } = process.env;
const { PORT = 3000 } = process.env;
const app = express();
// const app = connect();

const cors = require('cors');

// app.use(cors())
// app.use(cors(corsOptions))
// app.options('*', cors())

// app.get('/users', function (req, res, next) {
//   res.json({msg: 'This is CORS-enabled for all origins!'})
// })

// app.listen(80, function () {
//   console.log('CORS-enabled web server listening on port 80')
// })

// const corsOptions = {

// // {
//   // "origin": "*",
//   // "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//   // "preflightContinue": false,
//   // "optionsSuccessStatus": 204
// // }
//   origin: [
//     'https://vvs-mesto.nomoredomains.club',
//     'http://vvs-mesto.nomoredomains.club',
//     'localhost:3000',
//   ],
// };

// {
//   "origin": "*",
//   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//   "preflightContinue": false,
//   "optionsSuccessStatus": 204
// }

// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://vvs-mesto.nomoredomains.club',
  'http://vvs-mesto.nomoredomains.club',
  'localhost:3000'
];

app.use(function (req, res, next) {
  // const { origin } = req.headers; // Сохраняем источник запроса в переменную origin

//   const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
//   // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
//   const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
//   // сохраняем список заголовков исходного запроса
//   const requestHeaders = req.headers['access-control-request-headers'];

  // // проверяем, что источник запроса есть среди разрешённых
  // if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    // res.header('Access-Control-Allow-Origin', origin);
    // устанавливаем заголовок, который разрешает браузеру запросы из любого источника
    res.header('Access-Control-Allow-Origin', "*");
    return res.end();
  //}

//   if (method === 'OPTIONS') {
//     // разрешаем кросс-доменные запросы любых типов (по умолчанию)
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     // разрешаем кросс-доменные запросы с этими заголовками
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     // завершаем обработку запроса и возвращаем результат клиенту
//     return res.end();
//   }

  // next();
});



// const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную

// Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
// const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

// // Если это предварительный запрос, добавляем нужные заголовки
// if (method === 'OPTIONS') {
//     // разрешаем кросс-доменные запросы любых типов (по умолчанию)
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
// }

// сохраняем список заголовков исходного запроса
// const requestHeaders = req.headers['access-control-request-headers'];
// if (method === 'OPTIONS') {
//     // разрешаем кросс-доменные запросы с этими заголовками
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     // завершаем обработку запроса и возвращаем результат клиенту
//     return res.end();
// }





app.use(helmet());

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

// app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

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
