const { RoomRepository } = require("../../repository");

class RoomService {
  findAll = async (options = {}) => {
    return await RoomRepository.findAll(options);
  };

  findAndCountAll = async (options = {}) => {
    return await RoomRepository.findAndCountAll(options);
  };
}

module.exports = RoomService;
