const mongoose = require('mongoose');

const EtudiantSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  cours: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cours'
  }]
});

module.exports = mongoose.model('Etudiant', EtudiantSchema);