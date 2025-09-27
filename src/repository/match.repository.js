const {
  db: { Match },
} = require("../db/models");
const {
  CommonUtil: { fetchRecord },
} = require("../utils");

class MatchRepository {
  findById = async (id, options = {}) => {
    return await Match.findByPk(id, options);
  };

  findOne = async (options) => {
    return await Match.findOne(options);
  };

  findAll = async (options, unscoped = false) => {
    return await fetchRecord(Match, options, options?.is_paginate, unscoped);
  };

  update = async (requestData, options) => {
    return await Match.update(requestData, options);
  };

  create = async (requestPayload, transaction = null) => {
    return transaction
      ? await Match.create(requestPayload, { transaction })
      : await Match.create(requestPayload);
  };

  destroy = async (options) => {
    return await Match.destroy(options);
  };

  restore = async (options) => {
    return await Match.restore(options);
  };

  count = async (options) => {
    return await Match.count(options);
  };
}

module.exports = new MatchRepository();
