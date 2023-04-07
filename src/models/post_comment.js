'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post_comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Post,User,Reported_comment }) {
      // define association here
      this.belongsTo(User, {foreignKey:'commentor_id', as:'commentor_user'});
      this.belongsTo(Post, {foreignKey:'post_id', as:'post_comment'});
      this.hasMany(Reported_comment, {foreignKey:'reported_comment_id', as:'reported_comment'});
    }
  }
  Post_comment.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    commentor_id: {
      type:DataTypes.UUID,
      allowNull:false
    },
    post_id: {
      type:DataTypes.UUID,
      allowNull:false
    },
    comment_text: {
      type:DataTypes.STRING,
      allowNull:false
    } ,
    is_reported: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    no_of_report:{
      type: DataTypes.INTEGER,
      defaultValue:'0'
    },
  }, {
    sequelize,
    modelName: 'Post_comment',
  });
  return Post_comment;
};