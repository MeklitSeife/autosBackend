'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reported_comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Post_comment, User}) {
      // define association here
      this.belongsTo(Post_comment, {foreignKey:'reported_comment_id' , as:'reported_comment'});
      this.belongsTo(User, {foreignKey:'reporting_user_id', as:'comment_reporter_user'});
    }
  }
  Reported_comment.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    reported_comment_id:{
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
    modelName: 'Reported_comment',
  });
  return Reported_comment;
};