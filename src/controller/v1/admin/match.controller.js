const {
  Data: { MatchService },
} = require("../../../service");
const {
  ApiResponse: { successResponse, serverError, notFound },
  UserResponse: { userAttributes },
} = require("../../../responses");
const { matchStatus: status } = require("../../../constants");
const {
  db: { Season, SeasonParticipant, MatchScore },
} = require("../../../db/models");
const {
  CommonUtil: { isEmpty },
} = require("../../../utils");
const { Op, Sequelize, where } = require("sequelize");

class MatchController {
  constructor() {
    this.matchService = new MatchService();
  }

  setMatch = async (req) => {
    try {
      const { userId } = req.params;
      const {
        player2,
        skillLevel,
        location,
        status,
        isPrivate = true,
      } = req.body;

      const matchPayload = {
        player_1: userId,
        player_2: player2,
        skill_level: skillLevel,
        location: location,
        is_private: isPrivate,
        status: status,
      };

      const match = await this.matchService.create(matchPayload);

      return successResponse(1, "Match set successfully", match);
    } catch (error) {
      return serverError(0, "Something went wrong", error.message);
    }
  };

  list = async (req) => {
    try {
      const { userId } = req.params;
      const { matchStatus } = req.query;

      const whereClause = {
        // [Op.or]: [
        //   {
        //     [Op.or]: [{ player_1: userId }, { player_2: userId }],
        //   },
        //   // {
        //   //   player_1: {
        //   //     [Op.is]: null,
        //   //   },
        //   // },
        //   // {
        //   //   player_2: {
        //   //     [Op.is]: null,
        //   //   },
        //   // },
        // ],
        [Op.or]: [
          {
            [Op.or]: [{ player_1: userId }, { player_2: userId }],
          },
          {
            [Op.or]: {
              player_1: { [Op.is]: null },
              player_2: { [Op.is]: null },
            },
          },
          {
            [Op.or]: {
              player_1: { [Op.ne]: null },
              player_2: { [Op.ne]: null },
            },
          },
        ],
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
          (paranoid = false),
            orderClause.push(
              [
                Sequelize.literal(`CASE 
                WHEN status = '${status.COMPLETED}' THEN 1
                ELSE 2
              END`),
                "ASC",
              ]
              // ["date", "DESC"]
            );
          break;

        default:
          break;
      }

      console.log({ paranoid, required });
      const options = {
        where: whereClause,
        // required: required,
        include: [
          {
            association: "player_id1",
            // required: required,
            where: {
              deleted_at: null,
            },
            // paranoid: paranoid,
            // required: "deleted_at" == null ? false : true,
            attributes: [...userAttributes, "deleted_at"],
          },
          {
            association: "player_id2",
            // required: required,
            where: {
              deleted_at: null,
            },
            // paranoid: paranoid,
            // required: "deleted_at" == null ? false : true,
            attributes: [...userAttributes, "deleted_at"],
          },
        ],
        distinct: true,
        order: orderClause,
      };

      const match = await this.matchService.findAll(options);

      return successResponse(1, "Retrieve match list successfully", match);
    } catch (error) {
      return serverError(0, "Something went wrong", error.message);
    }
  };

  createSeason = async (req) => {
    try {
      const { name, status } = req.body;

      const season = await Season.create({ name, status });

      return successResponse(1, "Season created successfully", season);
    } catch (error) {
      return serverError(0, "Something went wrong", error.message);
    }
  };

  createSeasonParticipant = async (req) => {
    try {
      const { user_fk, season_fk } = req.body;

      const season = await SeasonParticipant.create({ user_fk, season_fk });

      return successResponse(
        1,
        "Season participant created successfully",
        season
      );
    } catch (error) {
      return serverError(0, "Something went wrong", error.message);
    }
  };

  createMatchScore = async (req) => {
    try {
      const { match_fk, user_fk, score } = req.body;

      const matchScore = await MatchScore.create({ match_fk, user_fk, score });

      return successResponse(1, "Match score added successfully", matchScore);
    } catch (error) {
      return serverError(0, "Something went wrong", error.message);
    }
  };

  listSeasonParticipant = async (req) => {
    try {
      const { userId } = req.params;

      const seasons = await Season.findAll({
        where: {
          status: "in-progress",
          id: {
            [Op.in]: Sequelize.literal(
              `(SELECT distinct season_fk FROM season_participants WHERE user_fk = '${userId}')`
            ),
          },
        },
      });

      let season, matches, match;
      matches = await this.matchService.findAll({
        where: {
          [Op.and]: { [Op.or]: [{ player_1: userId }, { player_2: userId }] },
          id: {
            [Op.notIn]: Sequelize.literal(
              `(SELECT distinct match_fk FROM match_scores WHERE user_fk = '${userId}')`
            ),
          },
          status: { [Op.not]: "completed" },
        },
      });
      console.log({ matches });

      if (!isEmpty(matches)) {
        for (const matchPayload of matches) {
          match = matchPayload;
          console.log({ matchPayload });
        }
      } else {
        return notFound(0, "Match not found", null);
      }

      return successResponse(1, "Retrieve season list successfully", match);
    } catch (error) {
      return serverError(0, "Something went wrong", error.message);
    }
  };
}

module.exports = MatchController;
