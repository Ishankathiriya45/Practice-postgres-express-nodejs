"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE "users"
      ALTER COLUMN "is_active"
      TYPE STRING
      USING CASE
        WHEN "is_active" = TRUE THEN "1"
        WHEN "is_active" = FALSE THEN "0"
        ELSE NULL
      END;
    `);
  },

  async down(queryInterface, Sequelize) {
    // Revert to old definition
    await queryInterface.sequelize.query(`
      ALTER TABLE "users"
      ALTER COLUMN "is_active"
      TYPE BOOLEAN
      USING CASE
        WHEN "is_active" = 1 THEN TRUE
        WHEN "is_active" = 0 THEN FALSE
        ELSE NULL
      END;
    `);
  },
};
