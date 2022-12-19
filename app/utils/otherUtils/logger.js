const { createLogger, format, transports } = require('winston');

const currentTime = new Date();

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
  transports: [
    new transports.File({ filename: `./app/logger/error.${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}.log`, level: 'error' }),
    new transports.File({ filename: `./app/logger/info.${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}.log`, level: 'info' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple(),
  }));
}

module.exports = logger;
