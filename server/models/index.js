const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../db/dbConfig");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
});

sequelize
  .authenticate()
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.TodoItems = require("./todoModel")(sequelize, DataTypes);

sequelize
  .sync({ force: false })
  .then(() => console.log("db sync..."))
  .catch((err) => console.log(err));

module.exports = db;
