'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Organizations', {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,        
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      organization_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      starting_year: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      bio: {
        type: DataTypes.STRING
      },
      profile_pic: {
        type: DataTypes.STRING
      },
      lisence: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_lisence_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
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
    await queryInterface.dropTable('Organizations');
  }
};