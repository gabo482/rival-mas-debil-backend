// src/index.js
require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json()); // ✅ Esto es obligatorio

// Importar rutas
const jugadoresRoutes = require('./routes/jugadores');
const cadenaRoutes = require('./routes/cadena');
const testRoutes = require('./routes/test');
// Usar rutas
app.use('/test', testRoutes);
app.use('/jugadores', jugadoresRoutes);
app.use('/cadena', cadenaRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenido al backend de El Rival Más Débil");
  res.send('Express está funcionando correctamente');
});

mongoose.connect('mongodb://localhost:27017/rivalmasdebil', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Conectado a MongoDB"))
.catch(err => console.error("❌ Error al conectar a MongoDB:", err));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);

});


