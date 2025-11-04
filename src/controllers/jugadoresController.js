// src/controllers/jugadoresController.js
const Jugador = require('../models/Jugador');
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
        puntos: 0 ,// ✅ puntos acumulados
        dineroAcumulado: 0,     // 💰 acumulado en la ronda actual
        dineroAsegurado: 0,     // 💼 total asegurado por decir “BANCO”
        estado: "activo"
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

exports.registrarJugadoresEnMongo = async (req, res) => {
  try {
    const resultados = [];

    for (const jugador of jugadoresEnMemoria) {
      const nuevo = new Jugador(jugador);
      const guardado = await nuevo.save();
      resultados.push(guardado);
    }

    return res.status(201).json({
      mensaje: "Jugadores registrados en MongoDB",
      jugadores: resultados
    });
  } catch (error) {
    console.error("Error al registrar jugadores:", error);
    return res.status(500).json({ error: "Error al guardar jugadores" });
  }
};

exports.registrarJugadoresEnMongo = async (req, res) => {
  try {
    const resultados = [];

    for (const jugador of jugadores) {
      const nuevo = new Jugador(jugador);
      const guardado = await nuevo.save();
      resultados.push(guardado);
    }

    return res.status(201).json({
      mensaje: "Jugadores registrados en MongoDB",
      jugadores: resultados
    });
  } catch (error) {
    console.error("Error al registrar jugadores:", error);
    return res.status(500).json({ error: "Error al guardar jugadores" });
  }
};

exports.procesarRespuesta = async (req, res) => {
  const { numeroEquipo, esCorrecta, dijoBanco } = req.body;

  try {
    const jugador = await Jugador.findOne({ numeroEquipo });

    if (!jugador || jugador.estado === "eliminado") {
      return res.status(404).json({ error: "Equipo no válido o eliminado" });
    }

    const puntosPorRespuesta = 10;

    // Si dijo BANCO antes de responder
    if (dijoBanco) {
      jugador.dineroAsegurado += jugador.dineroAcumulado;
      jugador.dineroAcumulado = 0;
    }

    if (esCorrecta) {
      jugador.puntos += puntosPorRespuesta;
      jugador.dineroAcumulado += puntosPorRespuesta;
    } else {
      jugador.dineroAcumulado = 0;
    }

    await jugador.save();

    return res.status(200).json({
      mensaje: esCorrecta
        ? "Respuesta correcta procesada"
        : "Respuesta incorrecta, acumulado reiniciado",
      jugador
    });
  } catch (error) {
    console.error("Error al procesar respuesta:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
};



exports.borrarTodosLosJugadores = async (req, res) => {
  try {
    const resultado = await Jugador.deleteMany({});
    return res.status(200).json({
      mensaje: "Todos los jugadores han sido eliminados",
      eliminados: resultado.deletedCount
    });
  } catch (error) {
    console.error("Error al borrar jugadores:", error);
    return res.status(500).json({ error: "Error al eliminar jugadores" });
  }
};


