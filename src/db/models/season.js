"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Season extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Season.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: DataTypes.STRING,
      start_at: {
        type: DataTypes.DATE,
      },
      end_at: {
        type: DataTypes.DATE,
      },
      status: DataTypes.STRING,
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "Season",
      tableName: "seasons",
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );
  return Season;
};
