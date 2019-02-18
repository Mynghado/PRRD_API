// **************************
//
// Fichier d'entrée de l'API
//
// **************************

// 1.
// IMPORTS
// Import des nodes modules
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Déclaration et Instanciation du router
const router = express();
router.use(cors({ origin: true }));

// Import des modèles de données dans ./models
require('./models/modelTest');

// Import des routes dans ./routes
router.use('/machin', require('./routes/machin.route')); 
router.use('/test', require('./routes/routeTest')); 
// ----- Fin des imports -------------



mongoose.connect('mongodb://locacalhost:27017/test');


// 2.
// listen for requests
router.listen(process.env.port || 3000, function(){ // listen to the defined port, or 4000 otherwise
    console.log("\n\n\n *********** Listening for requests / En attente de requêtes ************** \n\n\n");



/*
// Partie pour le DHTMLX
var port = 1337;
var app = express();
 
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
 
app.listen(port, function(){
    console.log("Server is running on port "+port+"...");
});
*/


});