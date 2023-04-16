const Cours = require('../models/Cours');
const Professeur = require('../models/Professeur');
const Etudiant = require('../models/Etudiant');

exports.createCours = async (req, res) => {
  try {
    const professeur = await Professeur.findById(req.body.professeur);

    if (!professeur) {
      return res.status(404).send({ message: 'Professeur non trouvé' });
    }

    const cours = new Cours({
      titre: req.body.titre,
      professeur: req.body.professeur,
      etudiants: []
    });

    await cours.save();
    professeur.cours.push(cours);
    await professeur.save();
    res.status(201).send(cours);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Ajoutez ici les autres fonctions pour gérer les différentes requêtes
