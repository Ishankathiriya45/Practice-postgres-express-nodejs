const { MatchScoreRepository } = require("../../repository");

class MatchScoreService {
  findById = async (id, options) => {
    return await MatchScoreRepository.findById(id, options);
  };

  findOne = async (options) => {
    return await MatchScoreRepository.findOne(options);
  };

  findAll = async (options = {}) => {
    return await MatchScoreRepository.findAll(options);
  };

  create = async (requestData, transaction) => {
    return await MatchScoreRepository.create(requestData, transaction);
  };

  bulkCreate = async (requestData, transaction) => {
    return await MatchScoreRepository.bulkCreate(requestData, transaction);
  };

  update = async (requestData, options) => {
    return await MatchScoreRepository.update(requestData, options);
  };

  findAndUpdateById = async (requestData, id) => {
    let data = await MatchScoreRepository.findById(id);
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
    return await MatchScoreRepository.destroy({
      where: {
        id: id,
      },
    });
  };

  // hard delete record
  destroyById = async (id) => {
    return await MatchScoreRepository.destroy({
      where: {
        id: id,
      },
      force: true,
    });
  };

  // restore data which is delete with soft delete
  restoreById = async (id) => {
    return await MatchScoreRepository.restore({
      where: {
        id: id,
      },
    });
  };
}
module.exports = MatchScoreService;
