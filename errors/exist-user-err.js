class ExistUserError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.message = 'Такой пользователь уже существует.';
  }
}

module.exports = ExistUserError;
