const { UserRepository } = require("../../repository");

class UserService {
  findById = async (id, options) => {
    return await UserRepository.findById(id, options);
  };

  findOne = async (options) => {
    return await UserRepository.findOne(options);
  };

  findAll = async (options = {}) => {
    return await UserRepository.findAll(options);
  };

  // get all user without apply default scope
  findAllUserWithoutScope = async (options) => {
    // options = {
    //   attributes: {
    //     exclude: ["password", "otp", "otp_send_date"],
    //   },
    //   include: [
    //     {
    //       model: UserRole,
    //       as: "userRole",
    //       attributes: [],
    //       include: [
    //         {
    //           model: Role,
    //           as: "role",
    //           attributes: [],
    //         },
    //       ],
    //     },
    //   ],
    //   distinct: true,
    //   ...options,
    // };
    return await UserRepository.findAll(options, true);
  };

  findAllUser = async (options) => {
    // options = {
    //   include: [
    //     {
    //       model: UserRole,
    //       as: "userRole",
    //       attributes: [],
    //       include: [
    //         {
    //           model: Role,
    //           as: "role",
    //           attributes: [],
    //         },
    //       ],
    //     },
    //   ],
    //   distinct: true,
    //   ...options,
    // };
    return await UserRepository.findAll(options);
  };

  findByEmail = async (email) => {
    return await UserRepository.findOne({
      where: {
        email: email,
      },
    });
  };

  findBySocialLogin = async (socialId, loginType) => {
    return await UserRepository.findOne({
      where: {
        social_id: socialId,
        login_type: loginType,
      },
    });
  };

  create = async (requestData) => {
    return await UserRepository.create(requestData);
  };

  update = async (requestData, options) => {
    return await UserRepository.update(requestData, options);
  };

  findAndUpdateById = async (requestData, id) => {
    let data = await UserRepository.findById(id);
    if (data) {
      data = await data.update(requestData, {
        where: {
          id: id,
        },
      });
    }
    return data;
  };

  // soft delete record
  deleteById = async (id) => {
    return await UserRepository.destroy({
      where: {
        id: id,
      },
    });
  };

  // hard delete record
  destroyById = async (id) => {
    return await UserRepository.destroy({
      where: {
        id: id,
      },
      force: true,
    });
  };

  // restore data which is delete with soft delete
  restoreById = async (id) => {
    return await UserRepository.restore({
      where: {
        id: id,
      },
    });
  };
}

module.exports = UserService;
