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
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name:  {
      type: DataTypes.STRING,
      allowNull: false
        } ,
    gender:  {
      type: DataTypes.ENUM("Female","Male","Rather not to mention"),
      allowNull: false
        } ,
    work_place:  {
      type: DataTypes.STRING,
      allowNull: false
        } ,
    experience: {
      type: DataTypes.STRING,
      allowNull: false
        } ,
    contact:  {
      type: DataTypes.STRING,
      allowNull: false
        } ,
  }, {
    sequelize,
    modelName: 'Doctor_recommendation',
  });
  return Doctor_recommendation;
};