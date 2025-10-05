const { GroupRepository } = require("../../repository");

class GroupService {
  findById = async (id, options) => {
    return await GroupRepository.findById(id, options);
  };

  findOne = async (options) => {
    return await GroupRepository.findOne(options);
  };

  findAll = async (options = {}) => {
    return await GroupRepository.findAll(options);
  };

  create = async (requestData, transaction) => {
    return await GroupRepository.create(requestData, transaction);
  };

  bulkCreate = async (requestData, transaction) => {
    return await GroupRepository.bulkCreate(requestData, transaction);
  };

  update = async (requestData, options) => {
    return await GroupRepository.update(requestData, options);
  };

  findAndUpdateById = async (requestData, id) => {
    let data = await GroupRepository.findById(id);
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
    return await GroupRepository.destroy({
      where: {
        id: id,
      },
    });
  };

  // hard delete record
  destroyById = async (id) => {
    return await GroupRepository.destroy({
      where: {
        id: id,
      },
      force: true,
    });
  };

  // restore data which is delete with soft delete
  restoreById = async (id) => {
    return await GroupRepository.restore({
      where: {
        id: id,
      },
    });
  };
}
module.exports = GroupService;
