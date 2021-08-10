class NotFoundIdError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
    this.message = 'Пользователь по указанному _id не найден.';
    console.log('this.statusCode');
    console.log(this.statusCode);
    console.log(this.message);
  }
}

module.exports = NotFoundIdError;