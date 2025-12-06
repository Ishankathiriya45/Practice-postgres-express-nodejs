"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("season_participants", "selected", {
      type: Sequelize.ARRAY(Sequelize.UUID),
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("season_participants", "selected", {
      type: Sequelize.ARRAY(Sequelize.UUID),
    });
  },
};
