// src/routes/jugadores.js
const express = require('express');
const router = express.Router();
const jugadoresController = require('../controllers/jugadoresController');

// Ruta POST para agregar jugador
router.post('/agregar', jugadoresController.agregarJugador);
router.get('/listar', jugadoresController.obtenerEquipos);
router.delete('/borrar/:numeroEquipo', jugadoresController.borrarEquipoPorNumero);
router.post('/registrar-memoria', jugadoresController.registrarJugadoresEnMongo);
router.post('/respuesta', jugadoresController.procesarRespuesta);
router.delete('/borrar-todos', jugadoresController.borrarTodosLosJugadores);


module.exports = router;

