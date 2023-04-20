const express = require("express");

const professeurController = require("../controllers/professeurController")
const router = express.Router();


router.get("/:professeurId", professeurController.getProfesseurById);

router.get("/professeur/:professeurId", professeurController.getProfesseurById);

router.post('/', professeurController.creerProfesseur);

router.patch('/:professeurId', professeurController.updateProfesseur);

router.delete('/:professeurId', professeurController.supprimerProfesseur);

module.exports = router;
