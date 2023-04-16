const express = require('express');
const coursController = require('../controllers/coursController');

const router = express.Router();

router.post('/', coursController.createCours);

// Ajoutez ici les autres routes pour gérer les différentes requêtes

module.exports = router;
