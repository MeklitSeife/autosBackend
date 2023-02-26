'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Parent, Organization, Health_professional,Post_comment, Reported_post}) {
      // define association here
      this.belongsTo(Parent, {foreignKey:'posting_user_id', as:'posting_parent'});
      this.belongsTo(Organization, {foreignKey:'posting_user_id', as:'posting_organization'});
      this.belongsTo(Health_professional, {foreignKey:'posting_user_id', as:'posting_health_professional'});
      this.hasMany(Post_comment, { foreignKey: "post_id", as: "commnet"});
      this.hasMany(Reported_post, { foreignKey: "reported_post_id", as: "reported_post"});    
    }
  }
  Post.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    posting_user_id:{
      type: DataTypes.UUID,
      allowNull:false
    },
    text: {
      type: DataTypes.STRING
    },
    post_img:{
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    is_reported: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    no_of_report:{
      type: DataTypes.INTEGER,
      defaultValue:'0'
    },
    orginal_poster_id: {
      type: DataTypes.UUID,
      allowNull:false
    },
  }, {
    sequelize,
    tableName:'posts',
    modelName: 'Post',
  });
  return Post;
};