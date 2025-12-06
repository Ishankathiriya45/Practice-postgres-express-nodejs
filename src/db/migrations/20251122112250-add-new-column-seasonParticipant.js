"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("season_participants", "selected_users", {
      type: Sequelize.ARRAY(Sequelize.UUID),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("season_participants", "selected_user", {
      type: Sequelize.ARRAY(Sequelize.UUID),
    });
  },
};
