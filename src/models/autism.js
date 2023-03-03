'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Autism extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Autism.init({
    discription: DataTypes.STRING,
    cover_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Autism',
  });
  return Autism;
};