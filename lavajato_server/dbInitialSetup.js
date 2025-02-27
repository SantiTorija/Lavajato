const db = require("./models");

module.exports = async () => {
  try {
    await db.sequelize.sync({ force: true });
    console.log("[Database] ¡Las tablas fueron creadas!");
    await require("./seeders/adminSeeder")();
    console.log("[Database] ¡Los datos de prueba fueron insertados!");
  } catch (error) {
    console.log("[Database] Error", error);
  }
};
