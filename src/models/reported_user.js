'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reported_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Parent, Organization, Health_professional }) {
      // define association here
    }
  }
  Reported_user.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    reported_user_id:{
      type:DataTypes.UUID,
      allowNull:false
    },
    reporting_user_id: {
      type:DataTypes.UUID,
      allowNull:false
    },
    reporting_reason: {
      type:DataTypes.ENUM("Abusive", "Illegal","Unrelated topic","Out of terms and policy","Other"),
      allowNull:false
    },
    reporting_reason_text:  {
      type:DataTypes.STRING
    },
  }, {
    sequelize,
    tableName:'reported_users',
    modelName: 'Reported_user',
  });
  return Reported_user;
};