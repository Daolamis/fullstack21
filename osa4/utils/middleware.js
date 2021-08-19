const logger = require('./logger');

const requestLogger = (req, res, next) => {
  logger.info('Method:', req.method, 'Path:', req.path, 'Body:', req.body);
  next();
};

const errorHandler = (error, req, res, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' });
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  if(error.name === 'JsonWebTokenError') {
    return res.status(400).json({ error: 'invalid token' });
  }

  next(error);
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  }
  next();
};


module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
  tokenExtractor
};