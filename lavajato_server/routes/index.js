const adminRoutes = require("./adminRoutes");
const logRoutes = require("./logRoutes");

module.exports = (app) => {
  //app.use(authRoutes);
  app.use("/admins", adminRoutes);
  app.use("/logs", logRoutes);
};
