'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Followers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Parent,Organization, Health_professional}) {
      // define association here
      this.belongsTo(Parent, {foreignKey:'follower_user_id', as:'follower_parent'});
      this.belongsTo(Organization, {foreignKey:'follower_user_id', as:'follower_organization'});
      this.belongsTo(Health_professional, {foreignKey:'follower_user_id', as:'follower_health_professional'});
    }
  }
  Followers.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    follower_user_id:{
      type: DataTypes.UUID,
      allowNull:false
    },
    followed_user_id:{
      type: DataTypes.UUID,
      allowNull:false
    },
  }, {
    sequelize,
    tableName:'followers',
    modelName: 'Followers',
  });
  return Followers;
};