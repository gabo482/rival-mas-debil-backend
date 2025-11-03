// src/controllers/jugadoresController.js

const jugadores = [];

exports.agregarJugador = (req, res) => {
    console.log("Tipo de contenido:", req.headers['content-type']);
    console.log("Cuerpo recibido:", req.body);
    console.log("Verificando cuerpo...")

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

exports.obtenerEquipos = (req, res) => {
  return res.status(200).json({
    mensaje: "Equipos registrados",
    jugadores
  });
};

exports.borrarEquipoPorNumero= (req, res) => {
  console.log("Tipo de contenido:", req.headers['content-type']);  
  console.log("Cuerpo recibido:", req.body);
  
  const { numeroEquipo } = req.params;

  const numero = parseInt(numeroEquipo);
  const index = jugadores.findIndex(e => e.numeroEquipo === numero);

  if (index === -1) {
    return res.status(404).json({ error: "Equipo no encontrado" });
  }

  const eliminado = jugadores.splice(index, 1)[0];

  return res.status(200).json({
    mensaje: "Equipo eliminado correctamente",
    equipoEliminado: eliminado
  });
};



