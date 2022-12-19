const nodemailer = require('nodemailer');
const {
  emailHost,
  emailPassword,
  emailService,
  emailUser,
} = require('../../configs');

const sendEmail = async (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: emailHost,
    service: emailService,
    port: 587,
    secure: true,
    auth: {
      user: emailUser,
      pass: emailPassword,
    },
  });

  transporter.sendMail({
    from: emailUser,
    to: email,
    subject,
    text,
  });
};

export default sendEmail;
