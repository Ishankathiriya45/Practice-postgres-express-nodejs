const {
  db: { User },
} = require("../db/models");

class UserRepository {
  findById = async (id, options = {}) => {
    return await User.findByPk(id, options);
  };

  findOne = async (options) => {
    return await User.findOne(options);
  };

  findAll = async (options, unscoped = false) => {
    return await fetchRecords(User, options, options?.is_paginate, unscoped);
  };

  update = async (requestData, options) => {
    return await User.update(requestData, options);
  };

  create = async (requestPayload, transaction = null) => {
    return transaction
      ? await User.create(requestPayload, { transaction })
      : await User.create(requestPayload);
  };

  destroy = async (options) => {
    return await User.destroy(options);
  };

  restore = async (options) => {
    return await User.restore(options);
  };

  count = async (options) => {
    return await User.count(options);
  };
}

module.exports = new UserRepository();
