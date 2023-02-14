'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Document.belongsTo(models.User, { foreignKey: 'user_id' });
      // define association here
    }
  }
  Document.init(
    {
      title: DataTypes.TEXT,
      path: DataTypes.TEXT,
      user_id: DataTypes.INTEGER,
      year: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Document',
    }
  );
  return Document;
};
