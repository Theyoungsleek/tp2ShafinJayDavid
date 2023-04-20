const mongoose = require('mongoose');

const EtudiantSchema = new mongoose.Schema({
    nom: {
        type:String,
        required:true
    },
    prenom: {
        type:String,
        required:true
    },
    numeroAdmission: {
      type: String,
      unique:true,
      required:true
    },
    date_naissance: {
        type: String,
        
        required:true
      },
      cours_suivi: {
        type: [String],
        sparse:true,
        default:[]
      },
  });

  module.exports = mongoose.model('Etudiant',EtudiantSchema);
