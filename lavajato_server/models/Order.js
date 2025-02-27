const { v4: uuidv4 } = require("uuid");
const { Op } = require("sequelize");

module.exports = (sequelize, Model, DataTypes, Product, Item) => {
  class Order extends Model {}

  Order.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      total: {
        type: DataTypes.DECIMAL,
      },
      cart: {
        type: DataTypes.JSON,
      },
    },
    {
      sequelize,
      modelName: "order",
    }
  );
  return Order;
};
