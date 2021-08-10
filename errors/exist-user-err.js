class ExistUserError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
    this.message = 'Такой пользователь уже существует.';
    console.log(this.statusCode);
    console.log(this.message);
  }
}

module.exports = ExistUserError;