const {
  Data: { MatchService, SeasonParticipantService, MatchScoreService },
} = require("../../../service");
const {
  ApiResponse: { successResponse, serverError },
  UserResponse: { userAttributes },
} = require("../../../responses");
const { matchStatus: status } = require("../../../constants");
const {
  db: { MatchScore },
} = require("../../../db/models");
const { Op, Sequelize } = require("sequelize");

class MatchController {
  constructor() {
    this.matchService = new MatchService();
    this.seasonParticipantService = new SeasonParticipantService();
    this.matchScoreService = new MatchScoreService();
  }

  setMatch = async (req) => {
    try {
      const { userId } = req.params;
      const {
        player2,
        skillLevel,
        location,
        season_fk,
        status,
        isPrivate = true,
      } = req.body;

      const matchPayload = {
        player_1: userId,
        player_2: player2,
        skill_level: skillLevel,
        location: location,
        season_fk: season_fk,
        is_private: isPrivate,
        status: status,
      };

      const match = await this.matchService.create(matchPayload);

      const options = [
        { user_fk: userId, season_fk: season_fk },
        { user_fk: player2, season_fk: season_fk },
      ];
      await this.seasonParticipantService.bulkCreate(options);

      return successResponse(1, "Match set successfully", match);
    } catch (error) {
      return serverError(0, "Something went wrong", error.message);
    }
  };

  list = async (req) => {
    try {
      const match = await this.matchService.findAll();

      return successResponse(1, "Retrieve match list successfully", match);
    } catch (error) {
      return serverError(0, "Something went wrong", error.message);
    }
  };

  createMatchScore = async (req) => {
    try {
      const { match_fk, user_fk, score } = req.body;

      const matchScore = await this.matchScoreService.create({
        match_fk,
        user_fk,
        score,
      });

      return successResponse(1, "Match score added successfully", matchScore);
    } catch (error) {
      return serverError(0, "Something went wrong", error.message);
    }
  };

  getMyFriendlyGameList = async (req) => {
    try {
      const { userId } = req.params;
      const { matchStatus } = req.query;

      const whereClause = {
        [Op.and]: [
          {
            [Op.or]: [{ player_1: userId }, { player_2: userId }],
          },
        ],
        type: "Friendly",
      };
      const orderClause = [];

      let paranoid = "";
      let required = "";
      switch (matchStatus) {
        case "Upcoming":
          whereClause.status = {
            [Op.in]: [status.WAITING, status.MATCH_SET, status.INPROGRESS],
          };
          // (paranoid = true),
          // (required = false),
          orderClause.push([
            Sequelize.literal(`CASE 
                WHEN status = '${status.INPROGRESS}' THEN 1
                WHEN status = '${status.MATCH_SET}' THEN 2
                WHEN status = '${status.WAITING}' THEN 3
                ELSE 5
              END`),
            "ASC",
          ]);
          break;

        case "Past":
          whereClause.status = {
            [Op.in]: [status.COMPLETED],
          };
          // (paranoid = false),
          orderClause.push([
            Sequelize.literal(`CASE 
                WHEN status = '${status.COMPLETED}' THEN 1
                ELSE 2
              END`),
            "ASC",
          ]);
          break;

        default:
          break;
      }

      // console.log({ paranoid, required });
      const options = {
        where: whereClause,
        // required: required,
        include: [
          {
            association: "player_id1",
            paranoid: false,
            attributes: [...userAttributes],
          },
          {
            association: "player_id2",
            paranoid: false,
            attributes: [...userAttributes],
          },
        ],
        distinct: true,
        order: orderClause,
      };

      const matches = await this.matchService.findAll(options);

      return successResponse(1, "Retrieve match list successfully", matches);
    } catch (error) {
      return serverError(0, "Something went wrong", error.message);
    }
  };
}

module.exports = MatchController;
