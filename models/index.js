const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/db.config.js')[env];

let db = {};

const databases = Object.keys(config.databases);

for (let i = 0; i < databases.length; i++) {
  let database = databases[i];
  let dbPath = config.databases[database];
  db[database] = new Sequelize(
    dbPath.database,
    dbPath.username,
    dbPath.password,
    dbPath,
  );
}

/**Add the Database Models**/
// fs.readdirSync(__dirname + '/rest')
//   .filter((file) => {
//     return (
//       file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname + '/rest', file))(db.rest, Sequelize.DataTypes)
//     db[model.name] = model;
//   });

  
if (fs.existsSync(__dirname + '/auto')) {
  if (fs.existsSync(__dirname + '/auto/init-models.js')) {
    const model = require(path.join(__dirname + '/auto/init-models.js'))(db.rest)
    Object.keys(model).forEach(key=>{
      db[key] = model;
    })
  }
}


Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;