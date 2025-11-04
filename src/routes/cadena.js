// src/routes/jugadores.js
const express = require('express');
const router = express.Router();
const cadenaController = require('../controllers/cadenaController')


router.get('/valor/puntos', cadenaController.obtenerCadenaPorPuntos);
router.put('/puntos/:numeroEquipo', cadenaController.actualizarPuntos);
router.post('/respuesta/banco', cadenaController.registrarRespuestaConBanco);

module.exports = router;