const { SeasonParticipantRepository } = require("../../repository");

class SeasonParticipantService {
  findById = async (id, options) => {
    return await SeasonParticipantRepository.findById(id, options);
  };

  findOne = async (options) => {
    return await SeasonParticipantRepository.findOne(options);
  };

  findAll = async (options = {}) => {
    return await SeasonParticipantRepository.findAll(options);
  };

  create = async (requestData, transaction) => {
    return await SeasonParticipantRepository.create(requestData, transaction);
  };

  bulkCreate = async (requestData, transaction) => {
    return await SeasonParticipantRepository.bulkCreate(
      requestData,
      transaction
    );
  };

  update = async (requestData, options) => {
    return await SeasonParticipantRepository.update(requestData, options);
  };

  findAndUpdateById = async (requestData, id) => {
    let data = await SeasonParticipantRepository.findById(id);
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
    return await SeasonParticipantRepository.destroy({
      where: {
        id: id,
      },
    });
  };

  // hard delete record
  destroyById = async (id) => {
    return await SeasonParticipantRepository.destroy({
      where: {
        id: id,
      },
      force: true,
    });
  };

  // restore data which is delete with soft delete
  restoreById = async (id) => {
    return await SeasonParticipantRepository.restore({
      where: {
        id: id,
      },
    });
  };
}
module.exports = SeasonParticipantService;
