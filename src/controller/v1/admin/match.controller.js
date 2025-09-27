const {
  Data: { MatchService },
} = require("../../../service");
const {
  ApiResponse: { successResponse, serverError },
  UserResponse: { userAttributes },
} = require("../../../responses");

class MatchController {
  constructor() {
    this.matchService = new MatchService();
  }

  setMatch = async (req) => {
    try {
      const { userId } = req.params;
      const { player2, skillLevel, location, isPrivate = true } = req.body;

      const matchPayload = {
        player_1: userId,
        player_2: player2,
        skill_level: skillLevel,
        location: location,
        is_private: isPrivate,
      };

      const match = await this.matchService.create(matchPayload);

      return successResponse(1, "Match set successfully", match);
    } catch (error) {
      return serverError(0, "Something went wrong", error.message);
    }
  };

  list = async (req) => {
    try {
      const match = await this.matchService.findAll({
        include: [
          {
            association: "player_id1",
            paranoid: false,
            required: true,
            attributes: userAttributes,
          },
          {
            association: "player_id2",
            paranoid: false,
            required: true,
            attributes: userAttributes,
          },
        ],
      });

      return successResponse(1, "Retrieve match list successfully", match);
    } catch (error) {
      return serverError(0, "Something went wrong", error.message);
    }
  };
}

module.exports = MatchController;
