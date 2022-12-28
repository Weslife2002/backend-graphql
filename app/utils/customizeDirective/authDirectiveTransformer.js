/* eslint-disable consistent-return */
const { mapSchema, getDirective, MapperKind } = require('@graphql-tools/utils');
const { defaultFieldResolver } = require('graphql');
const getRole = require('../getRole');

function authDirectiveTransformer(schema, directiveName) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: fieldConfig => {
      const authDirective = getDirective(schema, fieldConfig, directiveName)?.[0];

      if (authDirective) {
        const { requires } = authDirective;
        if (requires) {
          const { resolve = defaultFieldResolver } = fieldConfig;
          fieldConfig.resolve = async (source, args, context, info) => {
            const { req } = context;
            const token = req.headers.authorization.split(' ')[1];
            const role = await getRole(token);
            if (role !== requires) {
              throw new Error('not authorized');
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
