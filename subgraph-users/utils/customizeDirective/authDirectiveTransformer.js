/* eslint-disable consistent-return */
const { mapSchema, getDirective, MapperKind } = require('@graphql-tools/utils');
const { defaultFieldResolver, GraphQLError } = require('graphql');
const authorizeRole = require('./authorizeRole');

function authDirectiveTransformer(schema, directiveName) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: fieldConfig => {
      const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (authDirective) {
        const { requires } = authDirective;
        if (requires) {
          const { resolve = defaultFieldResolver } = fieldConfig;
          fieldConfig.resolve = async (source, args, context, info) => {
            const { signature } = context;
            const { role } = signature;
            if (!authorizeRole(role, requires)) {
              throw new GraphQLError('unauthorized!');
            }
            return resolve(source, args, context, info);
          };
          return fieldConfig;
        }
      }
    },
  });
}

module.exports = schema => authDirectiveTransformer(schema, 'auth');
