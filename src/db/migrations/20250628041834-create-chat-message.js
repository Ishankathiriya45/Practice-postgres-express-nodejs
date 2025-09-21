"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("chatmessages", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      room_fk: {
        type: Sequelize.UUID,
      },
      from_fk: {
        type: Sequelize.UUID,
      },
      message: {
        type: Sequelize.STRING,
      },
      message_type: {
        type: Sequelize.ENUM,
        values: ["text", "system_notification"],
        defaultValue: "text",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("chatmessages");
  },
};
