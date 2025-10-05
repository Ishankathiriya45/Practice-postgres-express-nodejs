const {
  db: { Season },
} = require("../db/models");
const {
  CommonUtil: { fetchRecord },
} = require("../utils");

class SeasonRepository {
  findById = async (id, options = {}) => {
    return await Season.findByPk(id, options);
  };

  findOne = async (options) => {
    return await Season.findOne(options);
  };

  findAll = async (options, unscoped = false) => {
    return await fetchRecord(Season, options, options?.is_paginate, unscoped);
  };

  update = async (requestData, options) => {
    return await Season.update(requestData, options);
  };

  create = async (requestPayload, transaction = null) => {
    return transaction
      ? await Season.create(requestPayload, { transaction })
      : await Season.create(requestPayload);
  };

  destroy = async (options) => {
    return await Season.destroy(options);
  };

  restore = async (options) => {
    return await Season.restore(options);
  };

  count = async (options) => {
    return await Season.count(options);
  };
}

module.exports = new SeasonRepository();
