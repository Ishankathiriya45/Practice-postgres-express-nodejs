const nodemailer = require("nodemailer");
const { EMAIL_LOCAL: email, EMAIL_PASSWORD_LOCAL: password } = process.env;

class EmailService {
  sendMail = async (to, subject, emailData, emailClient = "nodemailer") => {
    if (emailClient == "nodemailer") {
      let transpoter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: email,
          pass: password,
        },
      });

      const options = {
        from: email,
        to: to,
        subject: subject,
        text: emailData,
      };

      try {
        const info = await transpoter.sendMail(options);
        console.log({ OTP:info.envelope.to });
      } catch (error) {
        console.log({ error });
        throw error;
      }
    }
  };
}

module.exports = EmailService;
