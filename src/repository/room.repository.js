const {
  db: { Room },
} = require("../db/models");
const {
  CommonUtil: { fetchRecord },
} = require("../utils");

class RoomRepository {
  findAll = async (options = {}, unscoped = false) => {
    return await fetchRecord(Room, options, options.is_paginate, unscoped);
  };

  findAndCountAll = async (options = {}, unscoped = false) => {
    return await fetchRecord(Room, options, options.is_paginate, unscoped);
  };
}

module.exports = new RoomRepository();
