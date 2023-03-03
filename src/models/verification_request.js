'use strict';
const {
  Model
} = require('sequelize');
const organization = require('./organization');
module.exports = (sequelize, DataTypes) => {
  class Verification_request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Organization, Health_professional}) {
      // define association here
      this.belongsTo(Organization, {foreignKey:'requestor_id', as:'organization_verification'});
      this.belongsTo(Health_professional, {foreignKey:'requestor_id', as:'health_professional_verification'});

    }
  }
  Verification_request.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    lisence: {
      type: DataTypes.STRING,
      allowNull:false
    },
    requestor_id: {
      type: DataTypes.UUID,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'Verification_request',
  });
  return Verification_request;
};