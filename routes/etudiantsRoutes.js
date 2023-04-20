const express = require("express");

const EtudiantController = require("../controllers/EtudiantController")
const router = express.Router();


//router.get("/:etudiantId", EtudiantController.getCoursById);

router.get("/etudiant/:coursId", EtudiantController.getEtudiantById);

router.post('/', EtudiantController.creerEtudiant);

router.patch('/:etudiantId', EtudiantController.updateEtudiant);

router.delete('/:etudiantId', EtudiantController.supprimerEtudiant);

module.exports = router;
