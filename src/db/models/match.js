"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "player_1",
        as: "player_id1",
      });
      this.belongsTo(models.User, {
        foreignKey: "player_2",
        as: "player_id2",
      });
    }
  }
  Match.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      player_1: {
        type: DataTypes.UUID,
        references: {
          model: "User",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      player_2: {
        type: DataTypes.UUID,
        references: {
          model: "User",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      skill_level: DataTypes.STRING,
      location: DataTypes.STRING,
      type: {
        type: DataTypes.ENUM("League", "Friendly"),
        allowNull: false,
        defaultValue: "Friendly",
      },
      season_fk: {
        type: DataTypes.UUID,
        references: {
          model: "Season",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_private: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Match",
      tableName: "matches",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  return Match;
};
