const mongoose = require('mongoose');

const CoursSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true
  },
  professeur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professeur',
    required: true
  },
  etudiants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Etudiant'
  }]
});

module.exports = mongoose.model('Cours', CoursSchema);