const upperDirectiveTransformer = require('./upperDirectiveTransformer');
const authDirectiveTransformer = require('./authDirectiveTransformer');

function customizeDirective(schema) {
  const directiveTransformers = [
    upperDirectiveTransformer,
    authDirectiveTransformer,
  ];
  const transformedSchema = directiveTransformers.reduce(
    (curSchema, transformer) => transformer(curSchema),
    schema,
  );
  return transformedSchema;
}

module.exports = customizeDirective;
