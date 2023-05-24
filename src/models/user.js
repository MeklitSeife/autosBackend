'use strict';
const {
  Model, INTEGER
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Parent,Following,Follower,Post,Reported_user,Reported_post,User_warning, Reported_comment,Post_comment,Health_professional, Organization, Admin, Moderator}) {
      // define association here
      this.hasMany(Parent, { foreignKey: "user_id", as: "parent" });
      this.hasMany(Health_professional, { foreignKey: "user_id", as: "health_professional" });
      this.hasMany(Organization, { foreignKey: "user_id", as: "organization" });
      this.hasMany(Admin, { foreignKey: "user_id", as: "adminstrator" });
      this.hasMany(Moderator, { foreignKey: "user_id", as: "moderator" });
      this.hasMany(Post, { foreignKey: "posting_user_id", as: "posting_user"});
      this.hasMany(Post_comment, { foreignKey: "commentor_id", as: "commentor_user"});
      this.hasMany(Reported_post, { foreignKey: "reporting_user_id", as: "post_reporter_user"});
      this.hasMany(Reported_user, { foreignKey: "reporting_user_id", as: "reported_user" });
      this.hasMany(Reported_comment, {foreignKey:'reporting_user_id', as:'comment_reporter_user'});
      this.hasMany(User_warning, { foreignKey: "warned_user_id", as: "warned_user"});
      this.hasMany(Follower, { foreignKey: "follower_user_id", as: "follower"});
      this.hasMany(Following, { foreignKey: "followed_user_id", as: "following"});
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false
     },
    user_type: {
      type: DataTypes.ENUM("Parent","Organization","Health_professional","Admin","Moderator"),
      allowNull:false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    otp: {
      type:DataTypes.INTEGER
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    reset_pass_token_key:{
      type: DataTypes.STRING,
    },
    no_of_follower:{
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
    no_of_report:{
      type: DataTypes.INTEGER,
      defaultValue:'0'
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};