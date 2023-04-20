const { response } = require("express");
const { default: mongoose, mongo } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const HttpErreur = require("../models/http-erreur");

const Professeur = require("../models/Professeur");
const Cours = require("../models/Cours");

const getProfesseurById = async (requete, reponse, next) => {
  const professeurId = requete.params.professeurId;
  let professeur;
  try {
    professeur = await Professeur.findById(professeurId);
  } catch (err) {
    return next(
      new HttpErreur("Erreur lors de la récupération du professeur", 500)
    );
  }
  if (!professeur) {
    return next(new HttpErreur("Aucun professeur trouvé pour l'id fourni", 404));
  }
  reponse.json({ professeur: professeur.toObject({ getters: true }) });
};

const getProfesseursByCoursId = async (requete, reponse, next) => {
  const coursId = requete.params.coursId;

  let professeurs;
  try {
   let cours = await Cours.findById(coursId).populate("professeurs");
  
  professeurs =  cours.professeurs;
  console.log(cours);
    
    //professeurs = await Professeur.find({ cours_enseigne: coursId });
  } catch (err) {
    return next(
      new HttpErreur(
        "Erreur lors de la récupération des professeurs du cours",
        500
      )
    );
  }

  if (!professeurs || professeurs.length === 0) {
    return next(
      new HttpErreur("Aucun professeur trouvé pour le cours fourni", 404)
    );
  }

  reponse.json({
    professeurs: professeurs.map((professeur) => professeur.toObject({ getters: true })),
  });
};

const creerProfesseur = async (requete, reponse, next) => {
  const {professeurId, nom, prenom, date_embauche, photo,listeCours } = requete.body;
  const nouveauProfesseur = new Professeur({
    professeurId:uuidv4(),
    nom,
    prenom,
    date_embauche,
    photo,
    listeCours,
  });

  try {
    await nouveauProfesseur.save();
    
  } catch(err) {
    
    return next(new HttpErreur("Création de professeur échouée", 500));
  }

  

  
  reponse.status(201).json({ professeur: nouveauProfesseur });
};

const updateProfesseur = async (requete, reponse, next) => {
    const { nom, prenom, date_embauche,photo,listeCours } = requete.body; 
    const professeurId = requete.params.professeurId;
  
    let professeur;
  
    try {
      professeur = await Professeur.findById(professeurId);
      professeur.nom = nom;
      professeur.prenom = prenom;
      professeur.date_embauche = date_embauche;
      professeur.photo = photo;
      professeur.listeCours = listeCours;

      await professeur.save();
    } catch {
      return next(
        new HttpErreur("Erreur lors de la mise à jour du professeur", 500)
      );
    }
  
    reponse.status(200).json({ professeur: professeur.toObject({ getters: true }) });
  };
  
  const supprimerProfesseur = async (requete, reponse, next) => {
    const professeurId = requete.params.professeurId;
    let professeur;
    try {
      professeur = await Professeur.findById(professeurId).populate("listeCours");
    } catch {
      return next(
        new HttpErreur("Erreur lors de la suppression du professeur", 500)
      );
    }
    if(!professeur){
      return next(new HttpErreur("Impossible de trouver le professeur", 404));
    }
  
    try{
  
      
      await professeur.deleteOne({_id: professeurId});
      
  
    }catch{
      return next(
        new HttpErreur("Erreur lors de la suppression du professeur 2x", 500)
      );
    }
    reponse.status(200).json({ message: "Professeur supprimé" });
  };
  module.exports = {
  getProfesseurById: getProfesseurById,
  getProfesseursByCoursId: getProfesseursByCoursId,
  creerProfesseur: creerProfesseur,
  updateProfesseur: updateProfesseur,
  supprimerProfesseur: supprimerProfesseur,
  }
  
