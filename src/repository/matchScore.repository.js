const {
  db: { MatchScore },
} = require("../db/models");
const {
  CommonUtil: { fetchRecord },
} = require("../utils");

class MatchScoreRepository {
  findById = async (id, options = {}) => {
    return await MatchScore.findByPk(id, options);
  };

  findOne = async (options) => {
    return await MatchScore.findOne(options);
  };

  findAll = async (options, unscoped = false) => {
    return await fetchRecord(MatchScore, options, options?.is_paginate, unscoped);
  };

  update = async (requestData, options) => {
    return await MatchScore.update(requestData, options);
  };

  create = async (requestPayload, transaction = null) => {
    return transaction
      ? await MatchScore.create(requestPayload, { transaction })
      : await MatchScore.create(requestPayload);
  };

  destroy = async (options) => {
    return await MatchScore.destroy(options);
  };

  restore = async (options) => {
    return await MatchScore.restore(options);
  };

  count = async (options) => {
    return await MatchScore.count(options);
  };
}

module.exports = new MatchScoreRepository();
