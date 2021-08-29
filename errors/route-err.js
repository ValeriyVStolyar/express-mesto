class NotExistRoutError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 454;
    this.message = 'Был запрошен несуществующий роут.';
  }
}

module.exports = NotExistRoutError;
