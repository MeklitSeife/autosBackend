'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follower extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User, {  foreignKey: "follower_user_id", as: "follower"});
    }
  }
  Follower.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    follower_user_id:{
      type: DataTypes.UUID,
      allowNull:false
    },
    user_id:{
      type: DataTypes.UUID,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'Follower',
  });
  return Follower;
};