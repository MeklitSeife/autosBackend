'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor_recommendation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Doctor_recommendation.init({
    name: DataTypes.STRING,
    gender: DataTypes.ENUM("Female","Male","Rather not to mention"),
    work_place: DataTypes.STRING,
    experience:DataTypes.STRING,
    contact: DataTypes.STRING,
    cover_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Doctor_recommendation',
  });
  return Doctor_recommendation;
};