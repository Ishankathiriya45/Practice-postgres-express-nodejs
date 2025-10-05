"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MatchScore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsTo(models.Match,{foreignKey:"match_fk", as:"matchScore"})
    }
  }
  MatchScore.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      match_fk: {
        type: DataTypes.UUID,
        references: {
          model: "Match",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      user_fk: {
        type: DataTypes.UUID,
        references: {
          model: "User",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      score: DataTypes.JSONB,
    },
    {
      sequelize,
      paranoid: true,
      modelName: "MatchScore",
      tableName: "match_scores",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  return MatchScore;
};
