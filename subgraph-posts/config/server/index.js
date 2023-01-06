require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  subgraphName: process.env.SUBGRAPH_NAME,
};
