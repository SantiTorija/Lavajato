const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

module.exports = (sequelize, Model, DataTypes, Product, Item) => {
  class Order extends Model {}

  Order.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cart: {
        type: DataTypes.JSON,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "order",
    }
  );
  return Order;
};
