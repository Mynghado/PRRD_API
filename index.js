// Import des nodes modules
const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


// Instanciation du router
const router = express();


// Automatically allow cross-origin requests
router.use(cors({ origin: true }));

// use the defined routes
router.use('/machin/', require('./routes/machin.route')); // use the file machin.route.js dans /routes

// listen for requests
router.listen(process.env.port || 8080, function(){ // listen to the defined port, or 4000 otherwise
	console.log("Listening for requests / En attente de requêtes");



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