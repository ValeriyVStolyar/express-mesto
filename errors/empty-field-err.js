class EmptyFieldError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.message = 'Поля email и password не должны быть пустыми.';
    console.log('this.statusCode');
    console.log(this.statusCode);
    console.log(this.message);
  }
}

module.exports = EmptyFieldError;