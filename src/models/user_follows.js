'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_follows extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User_follows}) {
      // define association here
      this.hasMany(User_follows, { foreignKey: "commentor_id", as: "user_follow"});
    }
  }
  User_follows.init({ 
    id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  follower_user_id:{
    type: DataTypes.UUID,
    allowNull:false
  },
  followed_user_id:{
    type: DataTypes.UUID,
    allowNull:false
  },
  }, {
    sequelize,
    modelName: 'User_follows',
  });
  return User_follows;
};