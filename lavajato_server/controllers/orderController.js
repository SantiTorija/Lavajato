const { Order, Day } = require("../models");
const { isOrder } = require("../services/orderService");
const { findOrCreate, findAndUpdate } = require("../services/dayService");

const orderController = {
  // GET /orders - Obtener todas las órdenes
  async index(req, res) {
    try {
      const orders = await Order.findAll();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // GET /orders/:id - Obtener una orden por ID
  async show(req, res) {
    try {
      //si hay una orden con date > hoy la trae, sino devuelve false
      const order = await isOrder(req.params.email);
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // POST /orders - Crear nueva orden
  async store(req, res) {
    try {
      const { date, slot } = req.params;

      //si no hay un dia con esa fecha lo crea, sino lo edita para agregar el slot
      await findOrCreate(date, slot);

      // 3. Crear la orden
      const newOrder = await Order.create(req.body);
      res.status(201).json(newOrder);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // PUT /orders/:id - Actualizar orden existente
  async update(req, res) {
    try {
      await findAndUpdate(req.query.dateToEdit, req.query.slotToEdit);
      await findOrCreate(req.body.cart.date, req.body.cart.slot);
      const [updated] = await Order.update(req.body, {
        where: { id: req.params.id },
      });

      if (!updated) {
        return res.status(404).json({ message: "Orden no encontrada" });
      }

      const updatedOrder = await Order.findByPk(req.params.id);
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // DELETE /orders/:id - Eliminar orden
  async destroy(req, res) {
    console.log(req.params);

    try {
      findAndUpdate(req.params.date, req.params.slot);
      const deleted = await Order.destroy({
        where: { id: req.params.id },
      });

      if (!deleted) {
        return res.status(404).json({ message: "Orden no encontrada" });
      }

      res.status(204).json(deleted);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = orderController;
