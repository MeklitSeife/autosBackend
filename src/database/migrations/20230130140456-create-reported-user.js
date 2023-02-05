'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Reported_users', {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,        
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      reported_user_id: {
        type: DataTypes.UUID,
        allowNull:false
      },
      reporting_user_id: {
        type: DataTypes.UUID,
        allowNull:false
      },
      reporting_reason: {
        type: DataTypes.STRING,
        allowNull:false
      },
      reporting_reason_text: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('Reported_users');
  }
};