class MongoError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
    this.message = 'Такой email уже существует.';
    console.log('this.statusCode');
    console.log(this.statusCode);
    console.log(this.message);
    console.log(this.name);
    console.log();
  }
}

module.exports = MongoError;