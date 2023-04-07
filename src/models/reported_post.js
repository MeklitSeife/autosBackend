'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reported_post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Post }) {
      // define association here
      this.belongsTo(Post, {foreignKey:'reported_post_id' , as:'reported_post'});
      this.belongsTo(User, {foreignKey:'reporting_user_id', as:'post_reporter_user'});
    }
  }
  Reported_post.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    reported_post_id:{
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
    modelName: 'Reported_post',
  });
  return Reported_post;
};