const {
  db: { SeasonParticipant },
} = require("../db/models");
const {
  CommonUtil: { fetchRecord },
} = require("../utils");

class SeasonParticipantRepository {
  findById = async (id, options = {}) => {
    return await SeasonParticipant.findByPk(id, options);
  };

  findOne = async (options) => {
    return await SeasonParticipant.findOne(options);
  };

  findAll = async (options, unscoped = false) => {
    return await fetchRecord(
      SeasonParticipant,
      options,
      options?.is_paginate,
      unscoped
    );
  };

  update = async (requestData, options) => {
    return await SeasonParticipant.update(requestData, options);
  };

  create = async (requestPayload, transaction = null) => {
    return transaction
      ? await SeasonParticipant.create(requestPayload, { transaction })
      : await SeasonParticipant.create(requestPayload);
  };

  bulkCreate = async (requestPayload, transaction = null) => {
    return transaction
      ? await SeasonParticipant.bulkCreate(requestPayload, { transaction })
      : await SeasonParticipant.bulkCreate(requestPayload);
  };

  destroy = async (options) => {
    return await SeasonParticipant.destroy(options);
  };

  restore = async (options) => {
    return await SeasonParticipant.restore(options);
  };

  count = async (options) => {
    return await SeasonParticipant.count(options);
  };
}

module.exports = new SeasonParticipantRepository();
