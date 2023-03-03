'use strict';
const {
  Model, INTEGER
} = require('sequelize');
const user_follows = require('./user_follows');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Parent,Post,User_follows, Post_comment,Health_professional, Organization, Admin, Moderator}) {
      // define association here
      this.hasMany(Post, { foreignKey: "posting_user_id", as: "posting_user"});
      this.hasMany(Parent, { foreignKey: "user_id", as: "parent" });
      this.hasMany(Health_professional, { foreignKey: "user_id", as: "health_professional" });
      this.hasMany(Organization, { foreignKey: "user_id", as: "organization" });
      this.hasMany(Admin, { foreignKey: "user_id", as: "adminstrator" });
      this.hasMany(Moderator, { foreignKey: "user_id", as: "moderator" });
      this.hasMany(Post_comment, { foreignKey: "commentor_id", as: "comment"});
      this.hasMany(User_follows, { foreignKey: "commentor_id", as: "user_follow"});

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
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};