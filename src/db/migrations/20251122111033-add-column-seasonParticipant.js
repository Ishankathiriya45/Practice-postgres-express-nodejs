"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      "season_participants",
      "selected_user",
      "selected_users"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      "season_participants",
      "selected_user",
      "selected_users"
    );
  },
};
