'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Entry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Entry.belongsTo(models.User, { foreignKey: 'user_id' });
      Entry.belongsTo(models.Category, { foreignKey: 'category_id' });
      Entry.belongsToMany(models.Tag, {
        through: 'TagEntries',
        foreignKey: 'entry_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      // define association here
    }
  }
  Entry.init(
    {
      user_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
      amount: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: 'Entry',
    }
  );
  return Entry;
};
