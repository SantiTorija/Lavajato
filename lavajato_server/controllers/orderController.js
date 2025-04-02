const { Order, Day } = require("../models");

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
      const order = await Order.findByPk(req.params.id);

      if (!order) {
        return res.status(404).json({ message: "Orden no encontrada" });
      }

      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // POST /orders - Crear nueva orden
  async store(req, res) {
    try {
      const { date, slot } = req.params;

      // 1. Buscar o crear el día
      const existingDay = await Day.findOne({
        where: { date: date },
      });

      // 2. Si el día ya existía (no se creó nuevo)
      if (!existingDay) {
        // Actualizar usando Sequelize correctamente
        await Day.create({
          date: date,
          slots_available: [slot],
        });
      }

      if (existingDay) {
        // Actualizar usando Sequelize correctamente
        existingDay.slots_available.push(slot);
        existingDay.changed("slots_available", true); // Marca explícitamente el campo como modificado
        await existingDay.save();
      }

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
    try {
      const deleted = await Order.destroy({
        where: { id: req.params.id },
      });

      if (!deleted) {
        return res.status(404).json({ message: "Orden no encontrada" });
      }

      res.status(204).json();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = orderController;
