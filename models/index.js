const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  define: { timestamps: false },
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.movie = require("./movie.model.js")(sequelize, Sequelize);
db.rating = require("./rating.model.js")(sequelize, Sequelize);

db.movie.hasMany(db.rating, { foreignKey: "movie_id" });
db.rating.belongsTo(db.movie, { foreignKey: "movie_id" });

module.exports = db;
