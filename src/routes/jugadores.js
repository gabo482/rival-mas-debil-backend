// src/routes/jugadores.js
const express = require('express');
const router = express.Router();
const jugadoresController = require('../controllers/jugadoresController');

// Ruta POST para agregar jugador
router.post('/agregar', jugadoresController.agregarJugador);
router.get('/listar', jugadoresController.obtenerEquipos);
router.delete('/borrar/:numeroEquipo', jugadoresController.borrarEquipoPorNumero);

module.exports = router;

