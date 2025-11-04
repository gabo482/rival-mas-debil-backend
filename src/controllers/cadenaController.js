
let cadena = []; // Asegúrate de que esta lista se alimente desde los equipos activos


exports.registrarRespuestaConBanco = (req, res) => {
  const { numeroEquipo, esCorrecta, dijoBanco } = req.body;

  const equipo = cadena.find(e => e.numeroEquipo === parseInt(numeroEquipo));
  if (!equipo || equipo.estado === "eliminado") {
    return res.status(404).json({ error: "Equipo no válido o eliminado" });
  }

  const montoPorRespuesta = 10;

  if (dijoBanco) {
    equipo.dineroAsegurado += equipo.dineroAcumulado;
    equipo.dineroAcumulado = 0;
  }

  if (esCorrecta) {
    equipo.dineroAcumulado += montoPorRespuesta;
    return res.status(200).json({
      mensaje: "Respuesta correcta",
      equipo
    });
  } else {
    equipo.dineroAcumulado = 0;
    return res.status(200).json({
      mensaje: "Respuesta incorrecta, dinero acumulado perdido",
      equipo
    });
  }
};






exports.obtenerCadenaPorPuntos = (req, res) => {
  if (cadena.length === 0) {
    return res.status(404).json({ error: "No hay equipos en la cadena" });
  }

  const ordenada = [...cadena]
    .filter(e => e.estado !== "eliminado")
    .sort((a, b) => b.puntos - a.puntos);

  return res.status(200).json({
    mensaje: "Cadena de valor ordenada por puntos acumulados",
    cadena: ordenada
  });
};


exports.actualizarPuntos = (req, res) => {
  const { numeroEquipo } = req.params;
  const { puntos } = req.body;

  const equipo = cadena.find(e => e.numeroEquipo === parseInt(numeroEquipo));
  if (!equipo) {
    return res.status(404).json({ error: "Equipo no encontrado" });
  }

  equipo.puntos += puntos;

  return res.status(200).json({
    mensaje: "Puntos actualizados",
    equipo
  });
};


exports.registrarRespuesta = (req, res) => {
  const { numeroEquipo, esCorrecta } = req.body;

  if (typeof numeroEquipo === 'undefined' || typeof esCorrecta === 'undefined') {
    return res.status(400).json({ error: "Se requiere numeroEquipo y esCorrecta" });
  }

  const equipo = cadena.find(e => e.numeroEquipo === parseInt(numeroEquipo));
  if (!equipo || equipo.estado === "eliminado") {
    return res.status(404).json({ error: "Equipo no válido o eliminado" });
  }

  if (esCorrecta) {
    equipo.puntos += 10; // ✅ Asignación automática
  }

  return res.status(200).json({
    mensaje: esCorrecta ? "Respuesta correcta, puntos asignados" : "Respuesta incorrecta, sin puntos",
    equipo
  });
};


