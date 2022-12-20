const { readFileSync, readdirSync } = require('fs');
const gql = require('graphql-tag');

const currentPath = './app/schemas/';

const schemaFileNames = readdirSync(currentPath).filter(
  filename => filename.match(/^.+\.graphql$/),
);

const loadedSchemas = schemaFileNames.map(
  schemaFile => readFileSync(currentPath + schemaFile, { encoding: 'utf-8' }),
);

const typeDefs = gql(loadedSchemas.join('\n'));

module.exports = typeDefs;
