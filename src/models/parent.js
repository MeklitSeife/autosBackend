'use strict';
const {
  Model, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Parent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Child}) {
      // define association here
      this.belongsTo(User, {foreignKey:'user_id', as:'parent'});
      this.hasMany(Child, { foreignKey: "parent_id", as: "child" });
    }
  }
  Parent.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id:{
      type:DataTypes.UUID,
      unique:true,
      allowNull:false
    },
    first_name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    last_name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    gender: {
      type:DataTypes.ENUM("Female", "Male", "Rather not to mention"),
      allowNull:false
    },
    relation: {
      type:DataTypes.ENUM("parent", "relative", "care taker"),
      allowNull:false
    },
    bio: {
      type:DataTypes.STRING
    },
    profile_pic:{
      type:DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Parent',
  });
  return Parent;
};