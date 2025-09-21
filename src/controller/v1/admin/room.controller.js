const { Sequelize, where, Op } = require("sequelize");
const {
  db: { User, Room, RoomMember, ChatMessage, group },
} = require("../../../db/models");
const {
  ApiResponse: { successResponse, serverError },
} = require("../../../responses");
const {
  Data: { RoomService },
} = require("../../../service");

class RoomController {
  constructor() {
    this.roomService = new RoomService();
  }

  create = async (req, res) => {
    const { room_fk, name } = req.body;

    const data = {
      name: name,
      room_fk: room_fk,
    };

    const room = await group.create(data);

    return successResponse(1, "Data created", room);
  };

  list = async (req, res) => {
    try {
      const { currentPage, pageSize, isPaginate = false, search } = req.query;

      const groupWhere = search
        ? {
            name: { [Op.iLike]: `%${search}%` },
          }
        : undefined;

      const userWhere = search
        ? {
            email: { [Op.iLike]: `%${search}%` },
          }
        : undefined;

      const options = {
        include: [
          {
            model: group,
            where: groupWhere,
            required: !!search,
          },
          {
            model: RoomMember,
            required: !!search,
            include: [
              {
                model: User,
                where: userWhere,
                required: !!search,
              },
            ],
          },
        ],
        distinct: true,
      };

      if (isPaginate) {
        options.currentPage = currentPage;
        options.pageSize = pageSize;
        options.is_paginate = isPaginate;
      }

      const user = await this.roomService.findAll(options);

      return successResponse(1, "Retrieve room list successfully", user);
    } catch (error) {
      return serverError(0, "Something went wrong", error.message);
    }
  };
}

module.exports = RoomController;
