'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsTo(models.Type, { foreignKey: 'type_id' });
      Category.hasMany(models.Entry, { foreignKey: 'category_id' });
      // define association here
    }
  }
  Category.init(
    {
      category: DataTypes.STRING,
      type_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Category',
    }
  );
  return Category;
};
