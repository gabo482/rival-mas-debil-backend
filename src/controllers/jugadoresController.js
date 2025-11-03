// src/controllers/jugadoresController.js
const jugadores = [];

exports.agregarJugador = (req, res) => {
  const { numeroEquipo, nombreEquipo, integrantes, icono } = req.body;

  if (!numeroEquipo || !nombreEquipo || !integrantes || !icono) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const nuevoJugador = {
    id: jugadores.length + 1,
    numeroEquipo,
    nombreEquipo,
    integrantes,
    icono,
  };

  jugadores.push(nuevoJugador);
  res.status(201).json({ mensaje: "Jugador agregado", jugador: nuevoJugador });
};