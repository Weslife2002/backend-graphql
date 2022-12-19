const { readFileSync, readdirSync } = require('fs');
const gql = require('graphql-tag');

const currentPath = './app/schemas/';
const schemaFiles = readdirSync(currentPath).filter(filename => filename.match(/^.+\.graphql$/));
const loadedSchema = schemaFiles.map(schemaFile => readFileSync(currentPath + schemaFile, { encoding: 'utf-8' }));
const typeDefs = gql(loadedSchema.join('\n'));

module.exports = typeDefs;
