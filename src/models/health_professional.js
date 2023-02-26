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
    static associate({User, Followers, Post, Post_comment, Reported_comment,Reported_post,User_warning}) {
      // define association here
      this.belongsTo(User, {foreignKey:'user_id', as:'health_professional'});
      this.hasMany(Post, { foreignKey: "posting_user_id", as: "posting_health_professional"});
      this.hasMany(Post_comment, { foreignKey: "commentor_id", as: "commentor_health_professional"});
      this.hasMany(Reported_comment, { foreignKey: "reporting_user_id", as: "comment_reporter_health_professional"});
      this.hasMany(User_warning, { foreignKey: "warned_user_id", as: "warned_health_professional"});
      this.hasMany(Reported_post, { foreignKey: "reporting_user_id", as: "post_reporter_health_professional"});

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
    tableName:'health_professionals',
    modelName: 'Health_professional',
  });
  return Health_professional;
};