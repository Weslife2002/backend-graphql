const manageSessionsOnLogin = require('../userResolversUtils/manageSessionsOnLogin');

function passportHandleSession(req, res) {
  const { email } = req.session.passport.user;
  req.session.user = { email };
  delete req.session.passport;
  manageSessionsOnLogin(req);
  res.status(200).send({
    message: 'Successful authentication!',
    data: {
      user: req.session.user,
    },
  });
}

module.exports = passportHandleSession;
