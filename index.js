// **************************
//
// Fichier d'entrée de l'API
//
// **************************

// 1.
// IMPORTS & INSTANCIATIONS
// Import des nodes modules
const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Instanciations
const router = express();
router.use(
  cors({
    origin: true
  })
);
router.use(bodyParser.json());

// Import des modèles de données dans ./models
require("./models/modelTest");

// Import des routes dans ./routes
router.use("/machin", require("./routes/machin.route"));
router.use("/test", require("./routes/routeTest"));



// 2.
// CONNEXION AVEC MONGODB
const url = "mongodb://locacalhost:27017/new_york"
mongoose.connect(url);
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', () => {
  console.log(`mongoose connection open to ${url}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`mongoose connection err: `, err);
});



// 3.
// DEFINITION DU PORT DE L'API
const port = process.env.port || 3000;
router.listen(port, function () {
  console.log(
    "\n\n\n *********** Listening for requests / En attente de requêtes ************** \n " +
    "Port utilisé : " + port + "\n\n\n"
  );



  /*
// Partie pour DHTMLX
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
*/
});