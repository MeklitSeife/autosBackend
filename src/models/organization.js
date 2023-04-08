'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Verification_request,User_warning}) {
      // define association here
      this.belongsTo(User, {foreignKey:'user_id', as:'organization'});
      this.hasMany(User_warning, { foreignKey: "warned_user_id", as: "warned_organization"});
      this.hasMany(Verification_request, { foreignKey: "requestor_id", as: "organization_verification"});
      
    }
  }
  Organization.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id:{
      type: DataTypes.UUID,
      unique:true,
      allowNull:false
    },
    organization_name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    address: {
      type: DataTypes.STRING,
      allowNull:false
    },
    starting_year: {
      type: DataTypes.STRING,
      allowNull:false
    },
    bio: {
      type: DataTypes.STRING
    },
    profile_pic: {
      type: DataTypes.STRING
    },
    lisence: {
      type: DataTypes.STRING,
      allowNull:false
    },
    is_lisence_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue:false
    }
  }, {
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};