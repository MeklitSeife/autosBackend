'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Users', {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,        
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      email:{
        type:DataTypes.STRING,
        defaultValue:false
      },
      password: {
        type: DataTypes.STRING,
        defaultValue:false
      },
      user_type: {
        type: DataTypes.ENUM("Parent","Organization","Health_professional","Admin","Moderator"),
        allowNull:false
      },
      otp: {
        type:DataTypes.INTEGER
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      reset_pass_token_key:{
        type: DataTypes.STRING
      },
      no_of_follower: {
        type: DataTypes.INTEGER,
        defaultValue:'0'
      },
      no_of_following: {
        type: DataTypes.INTEGER,
        defaultValue:'0'
      },
      is_reported: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
      },
      no_of_report: {
        type: DataTypes.INTEGER,
        defaultValue:'0'
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
    await queryInterface.dropTable('Users');
  }
};