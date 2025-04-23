const { Order } = require("../models");

const isOrder = async (email) => {
  try {
    const orders = await Order.findAll({
      where: { phone: email },
    });
    console.log(orders);
    console.log(email);

    if (!orders) {
      return res.status(404).json({ message: "Orden no encontrada" });
    }
    const today = new Date();

    const filteredOrders = orders.filter((order) => {
      const cart = order.cart[0]; // acceso seguro al primer ítem
      if (cart.date) {
        const orderDate = new Date(cart.date);
        return orderDate > today;
      }
      return false;
    });
    return filteredOrders;
  } catch (error) {
    return error;
  }
};

module.exports = { isOrder };
