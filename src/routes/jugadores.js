// src/routes/jugadores.js
const express = require('express');
const router = express.Router();
const { agregarJugador } = require('../controllers/jugadoresController');

router.post('/agregar', agregarJugador);

module.exports = router;