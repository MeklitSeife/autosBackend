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
    static associate({Post, Parent, Health_professional, Organization, Reported_comment }) {
      // define association here
      this.belongsTo(Post, {foreignKey:'post_id', as:'commnet'});
      this.belongsTo(Parent, {foreignKey:'commentor_id', as:'commentor_parent'});
      this.belongsTo(Health_professional, {foreignKey:'commentor_id', as:'commentor_health_professional'});
      this.belongsTo(Organization, {foreignKey:'commentor_id', as:'commentor_organization'});
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
    }
  }, {
    sequelize,
    modelName: 'Post_comment',
  });
  return Post_comment;
};