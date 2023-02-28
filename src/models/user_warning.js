'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_warning extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Parent, Organization, Health_professional}) {
      // define association here
      this.belongsTo(Health_professional, {foreignKey:'warned_user_id', as:'warned_health_professional'});
      this.belongsTo(Organization, {foreignKey:'warned_user_id', as:'warned_organization'});
      this.belongsTo(Parent, {foreignKey:'warned_user_id', as:'warned_parent'});
      
    }
  }
  User_warning.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    warned_user_id: {
      type: DataTypes.UUID,
      allowNull:false
    },
    warning_reason:  {
      type: DataTypes.STRING,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'User_warning',
  });
  return User_warning;
};