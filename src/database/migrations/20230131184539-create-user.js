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
      user_name:{
        type: DataTypes.STRING,
        defaultValue:false
      },
      email:{
        type:DataTypes.STRING,
        defaultValue:false
      },
      phone_no: {
        type: DataTypes.STRING,
        defaultValue:false
      },
      password: {
        type: DataTypes.STRING,
        defaultValue:false
      },
      confirm_password: {
        type: DataTypes.STRING,
        defaultValue:false
      },
      user_type: {
        type: DataTypes.ENUM("Parent","Organization","Health_professional","Admin","Moderator"),
        allowNull:false
      },
      reset_pass_token_key:{
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
    await queryInterface.dropTable('Users');
  }
};