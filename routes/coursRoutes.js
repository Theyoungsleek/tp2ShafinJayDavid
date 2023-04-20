const express = require("express");

const coursController = require("../controllers/coursController")
const router = express.Router();


router.get("/:coursId", coursController.getCoursById);

//router.get("/cours/:coursId", coursController.getCoursByUserId);

router.post('/', coursController.creerCours);

router.patch('/:coursId', coursController.updateCours);

router.delete('/:coursId', coursController.supprimerCours);

module.exports = router;
