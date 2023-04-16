const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const coursRoutes = require('./app/routes/coursRoutes');
const professeursRoutes = require('./app/routes/professeursRoutes');
const etudiantsRoutes = require('./app/routes/etudiantsRoutes');
const HttpErreur = require("./models/http-erreur");
const app = express();
const PORT = process.env.PORT || 3000;

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
.connect("mongodb://127.0.0.1:27017")
.then(() => {
    app.listen(5000)
    console.log("Connexion à la base de données réussie");
})
.catch(erreur => {
    console.log(erreur);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


