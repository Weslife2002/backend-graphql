const { createLogger, format, transports } = require('winston');

const currentTime = new Date();

const logger = createLogger({
  level: ['info', 'error'],
  format: format.combine(
    format.timestamp(),
    format.json(),
    format.timestamp(),
    format.printf(info => `${info.timestamp} - ${info.level}: ${info.message}`),
  ),
  transports: [
    new transports.File({
      filename: `./app/logger/info.${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}.log`,
      level: 'info',
    }),
    new transports.File({
      filename: `./app/logger/error.${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${currentTime.getDate()}.log`,
      level: 'error',
    }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    // level: consoleloggerLevel,
    format: format.combine(
      format.combine(
        format.timestamp(),
        format.json(),
        format.colorize(),
        format.timestamp(),
        format.printf(info => `${info.timestamp} - ${info.level}: ${info.message}`),
      ),
    ),
    // format: format.simple(),
  }));
}

module.exports = logger;
