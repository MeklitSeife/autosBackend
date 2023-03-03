'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Doctor_recommendations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      gender: {
        type: DataTypes.ENUM("Female","Male","Rather not to mention")
      },
      work_place: {
        type: DataTypes.STRING
      },
      contact: {
        type: DataTypes.STRING
      },
      experience:{
        type: DataTypes.STRING
      },
      cover_image: {
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
    await queryInterface.dropTable('Doctor_recommendations');
  }
};