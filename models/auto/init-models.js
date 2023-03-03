var DataTypes = require("sequelize").DataTypes;
var _edges = require("./edges");
var _nodes = require("./nodes");
var _parts = require("./parts");
var _user = require("./user");

function initModels(sequelize) {
  var edges = _edges(sequelize, DataTypes);
  var nodes = _nodes(sequelize, DataTypes);
  var parts = _parts(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    edges,
    nodes,
    parts,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
