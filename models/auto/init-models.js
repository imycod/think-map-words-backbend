var DataTypes = require("sequelize").DataTypes;
var _categories = require("./categories");
var _user = require("./user");

function initModels(sequelize) {
  var categories = _categories(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    categories,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
