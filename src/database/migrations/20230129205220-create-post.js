'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Posts', {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,        
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      posting_user_id: {
        type: DataTypes.UUID,
        allowNull:false
      },
      text: {
        type: DataTypes.STRING
      },
      post_img: {
        type:DataTypes.ARRAY(DataTypes.STRING),
      },
      is_reported: {
        type: DataTypes.BOOLEAN,
        defaultValue:false
      },
      no_of_report: {
        type: DataTypes.INTEGER,
        defaultValue:'0'
      },
      orginal_poster_id: {
        type: DataTypes.UUID,
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
    await queryInterface.dropTable('Posts');
  }
};