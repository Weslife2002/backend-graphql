module.exports = {
  getSession: (_, __, { req }) => ({
    code: 200,
    success: true,
    message: 'Get session success!',
    session: JSON.stringify(req.session),
  }),
};
