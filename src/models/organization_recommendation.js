'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization_recommendation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Organization_recommendation.init({
     id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    organization_name:  {
      type: DataTypes.STRING,
      allowNull: false
        } ,
    address: {
      type: DataTypes.STRING,
      allowNull: false
        } ,
    contact:  {
      type: DataTypes.STRING,
      allowNull: false
        } ,
    description:  {
      type: DataTypes.STRING,
      allowNull: false
        } ,
  }, {
    sequelize,
    modelName: 'Organization_recommendation',
  });
  return Organization_recommendation;
};