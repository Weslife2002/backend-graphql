const redisClient = require('./redisClient');

module.exports = async token => JSON.parse(await redisClient.get(token)).id;
