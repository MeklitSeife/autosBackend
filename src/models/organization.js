'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Post, User_follows, Post_comment, Reported_comment,Reported_post,User_warning}) {
      // define association here
      this.belongsTo(User, {foreignKey:'user_id', as:'organization'});
      this.hasMany(Post, { foreignKey: "posting_user_id", as: "posting_organization"});
      this.hasMany(User_follows, { foreignKey: "follower_user_id", as: "follower_organization"});
      this.hasMany(Post_comment, { foreignKey: "commentor_id", as: "commentor_organization"});
      this.hasMany(Reported_comment, { foreignKey: "reporting_user_id", as: "comment_reporter_organization"});
      this.hasMany(Reported_post, { foreignKey: "reporting_user_id", as: "post_reporter_organization"});
      this.hasMany(User_warning, { foreignKey: "warned_user_id", as: "warned_organization"});

    }
  }
  Organization.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id:{
      type: DataTypes.UUID,
      unique:true,
      allowNull:false
    },
    organization_name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    address: {
      type: DataTypes.STRING,
      allowNull:false
    },
    starting_year: {
      type: DataTypes.STRING,
      allowNull:false
    },
    bio: {
      type: DataTypes.STRING
    },
    profile_pic: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    no_of_follower:{
      type: DataTypes.INTEGER,
      defaultValue:'0'
    },
    no_of_following: {
      type: DataTypes.INTEGER,
      defaultValue:'0'
    },
    lisence: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull:false
    },
    is_lisence_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    is_reported: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    no_of_report:{
      type: DataTypes.INTEGER,
      defaultValue:'0'
    }
  }, {
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};