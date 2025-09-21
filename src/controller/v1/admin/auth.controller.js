const {
  Data: { UserService },
} = require("../../../service");
const {
  CommonUtils: { generateOtp, getDynamicContent },
} = require("../../../utils");
const {
  ApiResponse: { successResponse, serverError, failConflict, notFound },
} = require("../../../responses");
const eventHandler = require("../../../handler/eventHandler");

class AuthController {
  constructor() {
    this.userService = new UserService();
  }

  register = async (req) => {
    try {
      const { firstname, lastname, email, step } = req.body;

      const getEmail = await this.userService.findByEmail(email);
      if (getEmail) {
        return failConflict(0, "Already this email exist", null);
      }

      const authPayload = {
        first_name: firstname,
        last_name: lastname,
        email: email,
        step: step,
      };
      const auth = await this.userService.create(authPayload);

      return successResponse(1, "Register successfully", auth);
    } catch (error) {
      return serverError(0, "Something went wrong", error.message);
    }
  };

  sendOtp = async (req) => {
    try {
      const { email, type = "Email", isMailUpdate = true } = req.body;

      const user = await this.userService.findByEmail(email);
      if (!user) {
        return notFound(0, "User not found", null);
      }

      let otpData = generateOtp();
      await this.userService.update(
        {
          otp: otpData,
          otp_send_date: Date.now(),
          is_email_verified: true,
        },
        { where: { id: user.id } }
      );

      const otpDetail = {
        USER_NAME: user.first_name,
        OTP: otpData,
      };

      const subject = getDynamicContent(
        type == "Email"
          ? // ? isMailUpdate == true
            "email-updated-subject"
          : "email-verification-subject",
        // : "forgot-password-subject",
        null,
        "emailConstant"
      );

      const body = getDynamicContent(
        type === "Email"
          ? // ? isMailUpdate == true
            "email-updated-body"
          : "email-verification-body",
        // : "forgot-password-body",
        otpDetail,
        "emailConstant"
      );

      eventHandler.emit("send-mail", { email, subject, body });

      return successResponse(1, "Otp send successfully", null);
    } catch (error) {
      return serverError(0, "Something went wrong", error.message);
    }
  };
}

module.exports = AuthController;
