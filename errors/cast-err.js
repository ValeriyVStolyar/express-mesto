class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 490;
    this.message = 'Невалидный id.';
  }
}

module.exports = ValidationError;
