'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Parent, Health_professional, Organization, Admin, Moderator}) {
      // define association here
      this.hasMany(Parent, { foreignKey: "user_id", as: "parent" });
      this.hasMany(Health_professional, { foreignKey: "user_id", as: "health_professional" });
      this.hasMany(Organization, { foreignKey: "user_id", as: "organization" });
      this.hasMany(Admin, { foreignKey: "user_id", as: "adminstrator" });
      this.hasMany(Moderator, { foreignKey: "user_id", as: "moderator" });
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    phone_no: {
      type:DataTypes.STRING,
      allowNull:false,
      unique:true
     },
    password:{
      type:DataTypes.STRING,
      allowNull:false
     },
    confirm_password: {
      type:DataTypes.STRING,
      allowNull:false
     },
    user_type: {
      type: DataTypes.ENUM("Parent","Organization","Health_professional","Admin","Moderator"),
      allowNull:false
    },
    reset_pass_token_key:{
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    tableName:'users',
    modelName: 'User',
  });
  return User;
};