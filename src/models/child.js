'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Child extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Parent}) {
      // define association here
      this.belongsTo(Parent, {foreignKey:'parent_id', as:'child'})
    }
  }
  Child.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    parent_id:{
      type: DataTypes.UUID,
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
      type:DataTypes.ENUM("Female","Male","Rather not to mention"),
      allowNull:false
    },
    birthday: {
      type:DataTypes.STRING,
      allowNull:false
    },
    description:  {
      type:DataTypes.STRING
    },
    therapy_history:  {
      type:DataTypes.BOOLEAN,
      allowNull:false
    },
  }, {
    sequelize,
    modelName: 'Child',
  });
  return Child;
};