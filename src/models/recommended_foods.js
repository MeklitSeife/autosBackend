'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recommended_foods extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Recommended_foods.init({
    number: DataTypes.INTEGER,
    discription: DataTypes.STRING,
    cover_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Recommended_foods',
  });
  return Recommended_foods;
};