class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
    this.message = 'Невалидный id.';
    console.log('this.statusCode');
    console.log(this.statusCode);
    console.log(this.message);
    console.log(this.name);
    console.log();
  }
}

module.exports = ValidationError;