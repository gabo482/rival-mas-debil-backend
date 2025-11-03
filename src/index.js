// src/index.js
require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json()); // ✅ Esto es obligatorio

// Importar rutas
const jugadoresRoutes = require('./routes/jugadores');
const testRoutes = require('./routes/test');
// Usar rutas
app.use('/jugadores', jugadoresRoutes);
app.use('/test', testRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenido al backend de El Rival Más Débil");
  res.send('Express está funcionando correctamente');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);

});


