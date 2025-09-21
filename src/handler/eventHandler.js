const { EventEmitter } = require("events");
const {
  Integration: { EmailService },
} = require("../service");
const myEmitter = new EventEmitter();
const emailService = new EmailService();

myEmitter.on("send-mail", async (data) => {
  await emailService.sendMail(data.email, data.subject, data.body);
});

module.exports = myEmitter;
