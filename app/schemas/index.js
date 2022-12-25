const { readFileSync, readdirSync } = require('fs');

const currentPath = './app/schemas/';

function getAllSchemaFilesName(currentfolder) {
  let graphqlFileNames = readdirSync(currentfolder).filter(
    filename => filename.match(/^.+\.graphql$/),
  );

  const folderNames = readdirSync(currentfolder).filter(
    folderName => folderName.match(/^\w+$/),
  );
  folderNames.forEach(folderName => {
    const folderSchemaFileNames = getAllSchemaFilesName(`${currentfolder}/${folderName}`)
      .map(filename => `${folderName}/${filename}`);
    graphqlFileNames = graphqlFileNames.concat(folderSchemaFileNames);
  });
  return graphqlFileNames;
}

const schemaFileNames = getAllSchemaFilesName(currentPath);

const loadedSchemas = schemaFileNames.map(
  schemaFile => readFileSync(currentPath + schemaFile, { encoding: 'utf-8' }),
);

const typeDefs = loadedSchemas.join('\n');

module.exports = typeDefs;
