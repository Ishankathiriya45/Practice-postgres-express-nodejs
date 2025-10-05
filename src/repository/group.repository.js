const {
  db: { Group },
} = require("../db/models");
const {
  CommonUtil: { fetchRecord },
} = require("../utils");

class GroupRepository {
  findById = async (id, options = {}) => {
    return await Group.findByPk(id, options);
  };

  findOne = async (options) => {
    return await Group.findOne(options);
  };

  findAll = async (options, unscoped = false) => {
    return await fetchRecord(Group, options, options?.is_paginate, unscoped);
  };

  update = async (requestData, options) => {
    return await Group.update(requestData, options);
  };

  create = async (requestPayload, transaction = null) => {
    return transaction
      ? await Group.create(requestPayload, { transaction })
      : await Group.create(requestPayload);
  };

  destroy = async (options) => {
    return await Group.destroy(options);
  };

  restore = async (options) => {
    return await Group.restore(options);
  };

  count = async (options) => {
    return await Group.count(options);
  };
}

module.exports = new GroupRepository();

