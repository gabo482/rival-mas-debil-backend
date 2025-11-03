// src/controllers/jugadoresController.js

const jugadores = [];

exports.agregarJugador = (req, res) => {
    console.log("Tipo de contenido:", req.headers['content-type']);
    console.log("Cuerpo recibido:", req.body);
    res.send("Verificando cuerpo...")

    console.log("REQ BODY:", req.body);
    const { numeroEquipo, nombreEquipo, integrantes, icono } = req.body;

    if (!numeroEquipo || !nombreEquipo || !integrantes || !icono) {
        return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const nuevoJugador = {
        id: Date.now(),
        numeroEquipo,
        nombreEquipo,
        integrantes,
        icono,
    };

  jugadores.push(nuevoJugador);
  res.status(201).json({ mensaje: "Jugador agregado", jugador: nuevoJugador });
  
};