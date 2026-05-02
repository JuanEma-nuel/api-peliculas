const express = require("express");
const { sequelize } = require("./db");

const peliculasRoutes = require("./routes/peliculas.routes");
const authRoutes = require("./auth");
const logger = require("./middlewares/logger");
const apiKey = require("./middlewares/apiKey");
const validarToken = require("./middlewareToken");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(logger);
app.use(apiKey);

// LOGIN sin token
app.use("/", authRoutes);

// Películas protegidas con token
app.use("/peliculas", validarToken, peliculasRoutes);

sequelize.sync().then(() => {
  console.log("Base de datos conectada");
});

app.listen(PORT, () => {
  console.log("Servidor en http://localhost:3000");
});