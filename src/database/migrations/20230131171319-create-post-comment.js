'use strict';
/** @type {import('DataTypes-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Post_comments', {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,        
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      commentor_id: {
        type: DataTypes.UUID,
        allowNull:false
      },
      post_id: {
        type: DataTypes.UUID,
        allowNull:false
      },
      comment_text: {
        type: DataTypes.STRING,
        allowNull:false
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
    await queryInterface.dropTable('Post_comments');
  }
};