const {
  Data: {
    SeasonService,
    SeasonParticipantService,
    UserService,
    MatchService,
    MatchScoreService,
  },
} = require("../../../service");
const {
  ApiResponse: { successResponse, serverError },
} = require("../../../responses");
const { where, Sequelize, Op } = require("sequelize");
const moment = require("moment");

class SeasonController {
  constructor() {
    this.seasonService = new SeasonService();
    this.seasonParticipantService = new SeasonParticipantService();
    this.userService = new UserService();
    this.matchService = new MatchService();
    this.matchScoreService = new MatchScoreService();
  }

  create = async (req) => {
    try {
      const { name, start_at, end_at, status } = req.body;

      const season = await this.seasonService.create({
        name,
        start_at,
        end_at,
        status,
      });

      return successResponse(1, "Season created successfully", season);
    } catch (error) {
      return serverError(0, "Something went wrong", error.message);
    }
  };

  createSeasonParticipant = async (req) => {
    try {
      const { user_fk, season_fk } = req.body;

      const season = await this.seasonParticipantService.create({
        user_fk,
        season_fk,
      });

      return successResponse(
        1,
        "Season participant created successfully",
        season
      );
    } catch (error) {
      return serverError(0, "Something went wrong", error.message);
    }
  };

  list = async () => {
    try {
      const users = await this.userService.findAll({
        paranoid: false,
      });

      let seasons, matches;
      for (const user of users) {
        if (user.deleted_at) {
          seasons = await this.seasonService.findAll({
            where: {
              id: {
                [Op.in]: Sequelize.literal(
                  `(SELECT season_fk FROM season_participants WHERE user_fk = '${user.id}')`
                ),
              },
            },
          });

          for (const season of seasons) {
            const now = moment();
            const seasonDate = moment(season.end_at);
            if (
              now.format("YYYY-MM-DD") == seasonDate.format("YYYY-MM-DD") &&
              season.status == "in-progress"
            ) {
              matches = await this.matchService.findAll({
                where: {
                  [Op.or]: [{ player_1: user.id }, { player_2: user.id }],
                  season_fk: season.id,
                },
              });

              for (const match of matches) {
                const winner =
                  match.player_1 == user.id ? match.player_2 : match.player_1;
                const loser =
                  match.player_1 == user.id ? match.player_1 : match.player_2;

                const players = [winner, loser];
                for (const player of players) {
                  await this.matchScoreService.create({
                    match_fk: match.id,
                    user_fk: player,
                    score: { set_1: "0", set_2: "0", set_3: "0" },
                  });
                }
              }
            }
          }
        }
      }

      return successResponse(1, "Retrieve list successfully", matches);
    } catch (error) {
      return serverError(0, "Something went wrong", error.message);
    }
  };
}

module.exports = SeasonController;
