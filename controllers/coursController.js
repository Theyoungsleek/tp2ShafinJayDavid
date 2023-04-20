const { response } = require("express");
const {v4 : uuidv4} = require("uuid");
const { default: mongoose, mongo } = require("mongoose");

const HttpErreur = require("../models/http-erreur");
const Cours = require("../models/Cours");
const Etudiant = require("../models/Etudiant");
const Professeur = require("../models/Professeur");

let COURS_DATA = [
    {
        idCours:uuidv4, 
        nomCours: "Chad physics",
        professeur: "Giga Chad",
        etudiant: ["Cbum", "Siuuuu"],
        description : "Quoicoubeh Chad qui enseigne de la physique"

    }

];

const getCoursById = async (requete,reponse,next) => {
    const coursId = requete.params.coursId;
    let cours;
    try{
        cours = await Cours.findById(coursId);
    } catch (err){
        return next(
            new HttpErreur("Erreur de trouver Cours",500)
        );
    }
    if(!cours){
        return next(new HttpErreur("Aucun cours trouvee avec l'id fournis",404))
    }
    reponse.json({cours:cours.toObject({getters:true})});
}

const getCours = (requete, reponse, next) => {
    response.json({cours : COURS_DATA});
};

const creerCours = async (requete, reponse, next) => {
    const { id,nomCours, professeur, etudiants, description } = requete.body;
    const nouveauCours = new Cours({
      id:uuidv4(),
      nomCours,
      professeur,
      etudiants,
      description,
    });
  
    try { 
      await nouveauCours.save();
    } catch (err) {
      const erreur = new HttpErreur("Création de cours échouée", 500);
      console.log(err);
      return next(erreur);
    }
    reponse.status(201).json({ cours: nouveauCours });
  };

  const updateCours = async (requete, reponse, next) => {
    const { nomCours, professeur, etudiants, description } = requete.body;
    const coursId = requete.params.coursId;
  
    let cours;
  
    try {
      cours = await Cours.findById(coursId);
      cours.nomCours = nomCours;
      cours.professeur = professeur;
      cours.etudiants = etudiants;
      cours.description = description;
      await cours.save();
    } catch {
      return next(
        new HttpErreur("Erreur lors de la mise à jour du cours", 500)
      );
    }
  
    reponse.status(200).json({ cours: cours.toObject({ getters: true }) });
  };

  const supprimerCours = async (requete, reponse, next) => {
    const coursId = requete.params.coursId;
    let cours;
    try {
      cours = await Cours.findById(coursId);
    } catch (err) {
        return next(new HttpErreur("Erreur lors de la suppression du cours", 500));
        }
        if (!cours) {
        return next(new HttpErreur("Impossible de trouver le cours", 404));
        }
        
        try {
          await cours.deleteOne({_id: coursId});
        } catch {
        return next(
        new HttpErreur("Erreur lors de la suppression du cours x2", 500)
        );
        }
        reponse.status(200).json({ message: "Cours supprimé" });
        };
        
        exports.getCoursById = getCoursById;
        
        exports.creerCours = creerCours;
        exports.updateCours = updateCours;
        exports.supprimerCours = supprimerCours;

