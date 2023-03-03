const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('edges', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    from: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    to: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    arrows: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'edges',
    timestamps: false
  });
};
