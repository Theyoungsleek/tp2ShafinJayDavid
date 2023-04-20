const mongoose = require('mongoose');
const {v4 : uuidv4} = require("uuid");

const CoursSchema = new mongoose.Schema({
    nomCours: {
        type:String,
        required:true
    },
    professeur: {
        type: String,
        ref: 'Professeur',
      },
      etudiants: [
        {
          type: String,
          ref: 'Etudiant',
        },
      ],
      description: {
        type:String,
        required:true
    },
    });

module.exports = mongoose.model('Cours', CoursSchema);