const mongoose = require('mongoose');

const ProfesseurSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    date_embauche: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    listeCours: {
      type: [String],
      default: [],
    },
  });

  module.exports = mongoose.model('Professeur', ProfesseurSchema);
