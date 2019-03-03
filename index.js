// **************************
//
// Fichier d'entrée de l'API
//
//  Crée le 18/02/2019
// **************************

// 1.
// IMPORTS & INSTANCIATIONS
// Import des nodes modules
const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Instanciation du router
const router = express();
router.use(
  cors({
    origin: true
  })
);
router.use(bodyParser.json());

// Import des routes (depuis ./routes)
router.use("/test", require("./routes/route_test"));
router.use("/projet", require("./routes/route_project"));
router.use("/tasks", require("./routes/route_task"));
router.use("/links", require("./routes/route_link"));
router.use("/users", require("./routes/route_user"));

// 2.
// CONNEXION AVEC MONGODB
const url = "mongodb://localhost:27017/test"
mongoose.connect(url);
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

// Message si connexion OK
mongoose.connection.on('connected', () => {
  console.log(`mongoose connection open to / connexion ouverte avec : ${url}`);
});

// Message si connexion KO
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