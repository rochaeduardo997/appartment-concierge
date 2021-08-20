/* general imports */
const express = require("express");
const app     = express();

/* route file import */
const AppartmentsRoutes = require("./routes/appartments");
const ResidentsRoutes   = require("./routes/residents");
const ConciergesRoutes   = require("./routes/concierges");
const DeliveriesRoutes   = require("./routes/deliveries");

/* routes */
app.use("/appartments", AppartmentsRoutes);
app.use("/residents",   ResidentsRoutes);
app.use("/concierges",  ConciergesRoutes);
app.use("/deliveries",  DeliveriesRoutes);

module.exports = app;