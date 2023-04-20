const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const coursRoutes = require('./routes/coursRoutes');
const professeursRoutes = require('./routes/professeurRoutes');
const etudiantsRoutes = require('./routes/etudiantsRoutes');
const HttpErreur = require('./models/http-erreur');
const app = express();
const PORT = process.env.PORT || 3000;
const MongoClient = require('mongodb');
app.use(bodyParser.json());
app.use('/cours', coursRoutes);
app.use('/professeurs', professeursRoutes);
app.use('/etudiants', etudiantsRoutes);

app.use((requete, reponse, next) => {
    return next(new HttpErreur("Route non trouvée", 404));
  });


app.use((error, requete, reponse, next) => {
    if (reponse.headerSent) {
      return next(error);
    }
    reponse.status(error.code || 500);
    reponse.json({
      message: error.message || "Une erreur inconnue est survenue",
    });
  });


mongoose
.connect("mongodb://localhost:27017/test")
.then(() => {
    app.listen(3000)
    console.log("Connexion à la base de données réussie");
})
.catch(erreur => {
    console.log(erreur);
});


app.use(bodyParser.json());






