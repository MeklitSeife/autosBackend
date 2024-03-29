'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Doctor_recommendations', {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,        
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull:false
      },
      gender: {
        type: DataTypes.ENUM("Female","Male","Rather not to mention"),
        allowNull:false
      },
      work_place: {
        type: DataTypes.STRING,
        allowNull:false
      },
      contact: {
        type: DataTypes.STRING,
        allowNull:false
      },
      experience:{
        type: DataTypes.STRING,
        allowNull:false
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