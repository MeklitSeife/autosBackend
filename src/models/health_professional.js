'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Health_professional extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Followers, Verification_request,Post, Post_comment, Reported_comment,Reported_post,User_warning}) {
      // define association here
      this.belongsTo(User, {foreignKey:'user_id', as:'health_professional'});
      this.hasMany(User_warning, { foreignKey: "warned_user_id", as: "warned_health_professional"});
      this.hasMany(Verification_request, { foreignKey: "requestor_id", as: "health_professional_verification"});
    }
  }
  Health_professional.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      unique:true,
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
      type:DataTypes.ENUM("Female","Male","Rather not to mention"),
      allowNull:false
    },
    bio:{
      type: DataTypes.STRING
    },
    profile_pic: {
      type: DataTypes.STRING
    },
    lisence: {
      type: DataTypes.STRING,
      allowNull:false
    },
    experience: {
      type: DataTypes.INTEGER
    },
    working_place:  {
      type: DataTypes.STRING
    },
    is_lisence_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    no_of_follower:{
      type: DataTypes.INTEGER,
      defaultValue:'0'
    },
    no_of_following: {
      type: DataTypes.INTEGER,
      defaultValue:'0'
    }
  }, {
    sequelize,
    modelName: 'Health_professional',
  });
  return Health_professional;
};