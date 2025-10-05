const { SeasonRepository } = require("../../repository");

class SeasonService {
  findById = async (id, options) => {
    return await SeasonRepository.findById(id, options);
  };

  findOne = async (options) => {
    return await SeasonRepository.findOne(options);
  };

  findAll = async (options = {}) => {
    return await SeasonRepository.findAll(options);
  };

  create = async (requestData, transaction) => {
    return await SeasonRepository.create(requestData, transaction);
  };

  bulkCreate = async (requestData, transaction) => {
    return await SeasonRepository.bulkCreate(requestData, transaction);
  };

  update = async (requestData, options) => {
    return await SeasonRepository.update(requestData, options);
  };

  findAndUpdateById = async (requestData, id) => {
    let data = await SeasonRepository.findById(id);
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
    return await SeasonRepository.destroy({
      where: {
        id: id,
      },
    });
  };

  // hard delete record
  destroyById = async (id) => {
    return await SeasonRepository.destroy({
      where: {
        id: id,
      },
      force: true,
    });
  };

  // restore data which is delete with soft delete
  restoreById = async (id) => {
    return await SeasonRepository.restore({
      where: {
        id: id,
      },
    });
  };
}
module.exports = SeasonService;
