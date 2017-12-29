import Sequelize, { DataTypes } from 'sequelize';
import config from 'config';

const { NODE_ENV } = process.env;
const configData = config(NODE_ENV);
const { name, user, pass, host } = configData.database;


export const connectmysql = async () => {
  // new instance of sequelize w/config fed credentials
  // sync: false to always recreate db tables
  const db = new Sequelize(name, user, pass, {
    dialect: 'mysql',
    operatorsAliases: false,
    sync: false,
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

  const Maker = db.models.maker;
  const Pizza = db.models.pizza;
  const Topping = db.models.topping;

  return { Maker, Pizza, Topping };
}
