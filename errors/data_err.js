class WrongDataError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 480;
  }
}

module.exports = WrongDataError;
