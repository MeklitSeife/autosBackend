'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Causes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Causes.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    number:{
      type: DataTypes.INTEGER,
      autoIncrement:true
    } ,
    discription: {
      type: DataTypes.STRING,
      allowNull: false
        } ,
  }, {
    sequelize,
    modelName: 'Causes',
  });
  return Causes;
};