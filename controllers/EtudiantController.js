const { response } = require("express");
const { default: mongoose, mongo } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const HttpErreur = require("../models/http-erreur");

const Etudiant = require("../models/Etudiant");
const Cours = require("../models/Cours");

const getEtudiantById = async (requete, reponse, next) => {
    const etudiantId = requete.params.etudiantId;
    let etudiant;
    try {
        etudiant = await Etudiant.findById(etudiantId);
    } catch (err) {
        return next(
            new HttpErreur("Erreur lors de la récupération de l'étudiant", 500)
        );
    }
    if (!etudiant) {
        return next(new HttpErreur("Aucun étudiant trouvé pour l'id fourni", 404));
    }
    reponse.json({ etudiant: etudiant.toObject({ getters: true }) });
};

const getEtudiantsByCoursId = async (requete, reponse, next) => {
    const coursId = requete.params.coursId;

    let etudiants;
    try {
        let cours = await Cours.findById(coursId).populate("etudiants");

        etudiants = cours.etudiants;
        console.log(cours);

        //etudiants = await Etudiant.find({ cours_suivi: coursId });
    } catch (err) {
        return next(
            new HttpErreur(
                "Erreur lors de la récupération des étudiants du cours",
                500
            )
        );
    }

    if (!etudiants || etudiants.length === 0) {
        return next(
            new HttpErreur("Aucun étudiant trouvé pour le cours fourni", 404)
        );
    }

    reponse.json({
        etudiants: etudiants.map((etudiant) => etudiant.toObject({ getters: true })),
    });
};

const creerEtudiant = async (requete, reponse, next) => {
    const {id, nom, prenom, numeroAdmission, date_naissance, cours_suivi } = requete.body;
    let etudiantExist;

    try {
        etudiantExist = await Etudiant.findOne({numeroAdmission : numeroAdmission});
    } catch {
        return next(new HttpErreur("Etudiant existe deja", 500));
    }

    if (etudiantExist) {
        return next(
          new HttpErreur("Etudiant existe, veuillez vos connecter", 422)
        );
      }

    let nouvelEtudiant = new Etudiant({        
        id:uuidv4(),
        nom,
        prenom,
        numeroAdmission,
        date_naissance,
        cours_suivi: [],
    });

    try {
        await nouvelEtudiant.save();
    } catch (err) {
        const erreur = new HttpErreur("Création d'étudiant échouée 2x", 500);
        console.log(err)
        return next(erreur);
    }
    reponse.status(201).json({ etudiant: nouvelEtudiant.toObject({ getters:true}) });
};

const updateEtudiant = async (requete, reponse, next) => {
    const { nom, prenom, date_naissance } = requete.body;
    const etudiantId = requete.params.etudiantId;


    let etudiant;

    try {
        etudiant = await Etudiant.findById(etudiantId);
        etudiant.nom = nom;
        etudiant.prenom = prenom;
        etudiant.date_naissance = date_naissance;
        await etudiant.save();
    } catch {
        return next(
            new HttpErreur("Erreur lors de la mise à jour de l'étudiant", 500)
        );
    }

    reponse.status(200).json({ etudiant: etudiant.toObject({ getters: true }) });
};

const supprimerEtudiant = async (requete, reponse, next) => {
    const etudiantId = requete.params.etudiantId;
    let etudiant;
    try {
        etudiant = await Etudiant.findById(etudiantId).populate("cours_suivi");
    } catch {
        return next(
            new HttpErreur("Erreur lors de la suppression de l'étudiant", 500)
        );
    }
    if (!etudiant) {
        return next(new HttpErreur("Impossible de trouver l'étudiant", 404));
    }

    try {


        await etudiant.deleteOne({_id: etudiantId});
        

    } catch {
        return next(
            new HttpErreur("Erreur lors de la suppression de l'étudiant", 500)
        );
    }
    reponse.status(200).json({ message: "Étudiant supprimé" });
};

module.exports = {
    getEtudiantById: getEtudiantById,
    getEtudiantsByCoursId: getEtudiantsByCoursId,
    creerEtudiant: creerEtudiant,
    updateEtudiant: updateEtudiant,
    supprimerEtudiant: supprimerEtudiant
}