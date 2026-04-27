const express = require("express");
const { sequelize } = require("./db");

const peliculasRoutes = require("./routes/peliculas.routes");
const logger = require("./middlewares/logger");
const apiKey = require("./middlewares/apiKey");

const app = express();
const PORT = 3000;

app.use(express.json());

// Middlewares
app.use(logger);
app.use(apiKey);

// Rutas
app.use("/peliculas", peliculasRoutes);

// DB sync
sequelize.sync().then(() => {
  console.log("Base de datos conectada");
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});