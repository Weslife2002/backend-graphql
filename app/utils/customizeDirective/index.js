const upperDirectiveTransformer = require('./upperDirectiveTransformer');
const authDirectiveTransformer = require('./authDirectiveTransformer');

const directiveTransformers = [
  upperDirectiveTransformer,
  authDirectiveTransformer,
];

module.exports = schema => directiveTransformers.reduce(
  (curSchema, transformer) => transformer(curSchema),
  schema,
);
