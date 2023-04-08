'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Parents', {
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
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type:DataTypes.ENUM("Female", "Male","Rather not to mention"),
        allowNull: false,
      },
      relation: {
        type:DataTypes.ENUM("parent", "relative", "care taker"),
        allowNull: false,
      },
      bio: {
        type: DataTypes.STRING
      },
      profile_pic: {
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
    await queryInterface.dropTable('Parents');
  }
};