'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Following extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User, {  foreignKey: "followed_user_id", as: "following"});
    }
  }
  Following.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id:{
      type: DataTypes.UUID,
      allowNull:false
    },
    followed_user_id:{
      type: DataTypes.UUID,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'Following',
  });
  return Following;
};