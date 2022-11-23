var DataTypes = require("sequelize").DataTypes;
var _categories = require("./categories");
var _links = require("./links");
var _nodes = require("./nodes");
var _user = require("./user");

function initModels(sequelize) {
  var categories = _categories(sequelize, DataTypes);
  var links = _links(sequelize, DataTypes);
  var nodes = _nodes(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    categories,
    links,
    nodes,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
