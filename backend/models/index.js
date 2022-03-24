
const Sequelize = require('sequelize');
const User = require('./user')

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)
db.sequelize = sequelize;

// model 생성
db.User = User

// model init
User.init(sequelize)

module.exports = db;
