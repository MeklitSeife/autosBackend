'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Health_professionals', {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,        
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull:false
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull:false
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull:false
      },
      gender: {
        type:DataTypes.ENUM("Female", "Male","Rather not to mention"),
        allowNull: false,
      },
      bio: {
        type: DataTypes.STRING
      },
      profile_pic: {
        type:DataTypes.ARRAY(DataTypes.STRING),
      },
      cover_pic: {
        type:DataTypes.ARRAY(DataTypes.STRING),
      },
      no_of_follower: {
        type: DataTypes.INTEGER,
        defaultValue:'0'
      },
      no_of_following: {
        type: DataTypes.INTEGER,
        defaultValue:'0'
      },
      lisence: {
        type:DataTypes.ARRAY(DataTypes.STRING),
        allowNull:false
      },
      experience: {
        type: DataTypes.INTEGER
      },
      working_place: {
        type: DataTypes.STRING
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
      },
      is_reported: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
      },
      no_of_report: {
        type: DataTypes.INTEGER,
        defaultValue:'0'
      },
      is_blocked: {
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
    await queryInterface.dropTable('Health_professionals');
  }
};