const mongoose = require('mongoose');

const jugadorSchema = new mongoose.Schema({
  numeroEquipo: Number,
  nombreEquipo: String,
  integrantes: [String],
  icono: String,
  puntos: { type: Number, default: 0 },
  dineroAcumulado: { type: Number, default: 0 },
  dineroAsegurado: { type: Number, default: 0 },
  estado: { type: String, default: "activo" }
});

module.exports = mongoose.model('Jugador', jugadorSchema);