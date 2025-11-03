// src/index.js
require('dotenv').config();
const express = require('express');
const app = express();
const jugadoresRoutes = require('./routes/jugadores');


app.use(express.json());
app.use('/jugadores', jugadoresRoutes);



app.get("/", (req, res) => {
  res.send("Bienvenido al backend de El Rival Más Débil");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});