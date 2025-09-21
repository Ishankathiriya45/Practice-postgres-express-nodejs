"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChatMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Room, {
        foreignKey: "room_fk",
        // as: "ChatMessages",
      });
    }
  }
  ChatMessage.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      room_fk: DataTypes.UUID,
      from_fk: DataTypes.UUID,
      message: DataTypes.STRING,
      message_type: {
        type: DataTypes.ENUM,
        values: ["text", "system_notification"],
        defaultValue: "text",
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "ChatMessage",
      tableName: "chatmessages",
    }
  );
  return ChatMessage;
};
