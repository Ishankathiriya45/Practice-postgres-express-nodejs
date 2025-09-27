const {
  Data: { UserService },
} = require("../../../service");
const {
  CommonUtil: { generateOtp, getDynamicContent },
} = require("../../../utils");
const {
  ApiResponse: { successResponse, serverError, failConflict, notFound },
} = require("../../../responses");
const eventHandler = require("../../../handler/eventHandler");
const moment = require("moment");

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

  login = async (req) => {
    const { email } = req.body;

    const user = await this.userService.findOne({
      where: { email },
      paranoid: false,
    });
    // console.log({ user });

    if (user.deleted_at) {
      console.log({ IF: user.deleted_at });
      const deletedAt = moment(user.deleted_at);
      const currentDate = moment();

      const hoursDiff = Math.abs(currentDate.diff(moment(deletedAt), "minute"));
      console.log({ hoursDiff });

      if (hoursDiff > 2) {
        return failConflict(0, "User deleted");
      }
    }

    if (!user) {
      return notFound(0, "User not found");
    }

    return successResponse(1, "Login successfully", user);
  };

  deleteUser = async (req) => {
    const { userId } = req.params;

    const del = await this.userService.deleteById(userId);
    console.log({ del });

    // let user = await this.userService.findOne({
    //   where: { id: userId },
    //   paranoid: false,
    // });
    // console.log({ DEL: user.deleted_at });

    // if (user.deleted_at) {
    //   console.log({ IF: user.deleted_at });
    //   const deletedAt = moment(user.deleted_at);
    //   const currentDate = moment();

    //   // const hour = currentDate.diff(deletedAt, "hour");
    //   // console.log({ hour });

    //   const hoursDiff = Math.abs(currentDate.diff(moment(deletedAt), "minute"));
    //   console.log({ hoursDiff });

    //   if (hoursDiff >= 1) {
    //     await this.userService.deleteById(user.id);
    //     console.log({ message: "User deleted" });
    //   } else {
    //     await this.userService.restoreById(user.id);
    //     console.log({ message: "User restore and login" });
    //   }
    // }

    return successResponse(1, "User deleted successfully");
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
