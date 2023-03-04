var DataTypes = require("sequelize").DataTypes;
var _edges = require("./edges");
var _members = require("./members");
var _nodes = require("./nodes");
var _orders = require("./orders");
var _users = require("./users");

function initModels(sequelize) {
  var edges = _edges(sequelize, DataTypes);
  var members = _members(sequelize, DataTypes);
  var nodes = _nodes(sequelize, DataTypes);
  var orders = _orders(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  members.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(members, { as: "members", foreignKey: "user_id"});
  orders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});

  return {
    edges,
    members,
    nodes,
    orders,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
