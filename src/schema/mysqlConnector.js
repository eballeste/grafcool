import Sequelize, { DataTypes } from 'sequelize';
import config from 'config';

const { NODE_ENV } = process.env;
const configData = config(NODE_ENV);
const { name, user, pass, host } = configData.database;

// new instance of sequelize w/config fed credentials
const db = new Sequelize(name, user, pass, {
  dialect: 'mysql',
  operatorsAliases: false,
  host,
  port: 3360,
});

// models
const MakerModel = db.define('maker', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
});

const PizzaModel = db.define('pizza', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  handle: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  views: { type: DataTypes.INTEGER },
  name: { type: DataTypes.STRING },
});

const ToppingModel = db.define('topping', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING },
  price: { type: DataTypes.FLOAT },
});

// associations (creates foreign keys and join tables)
MakerModel.hasMany(PizzaModel);
ToppingModel.belongsToMany(PizzaModel, { through: 'pizzatoppings' });

// sync to create db tables, 
// will only create if they do not exist
db.sync();

const Maker = db.models.maker;
const Pizza = db.models.pizza;
const Topping = db.models.topping;

export { Maker, Pizza, Topping };