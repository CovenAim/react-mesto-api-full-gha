const http2 = require('http2');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.status = http2.constants.HTTP_STATUS_UNAUTHORIZED;

    console.log(`UnauthorizedError: ${message}`);
  }
}

module.exports = UnauthorizedError;
