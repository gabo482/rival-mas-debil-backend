const express = require('express');
const router = express.Router();

// Ruta GET de prueba
router.get('/', (req, res) => {
  res.json({ mensaje: 'Ruta GET funcionando correctamente' });
});

// Ruta POST de prueba
router.post('/', (req, res) => {
  const datos = req.body;
  res.json({ mensaje: 'Ruta POST funcionando correctamente', datosRecibidos: datos });
});

module.exports = router;