// ************************************************************
//
//  Fichier de modèle
//  Ce modèle de données aura une route associée dans ../routes
//
// ************************************************************

var mongoose = require('mongoose');


// 1.
// On déclare notre schéma de données
// => Données attendues par Mongo
var testSchema = new mongoose.Schema({
    nom: String,
    Age: Number,
    
});


// 2.
// On associe un objet mongo à notre schéma
var test = mongoose.model('test', testSchema);


// 3.
// On exporte le module que l'on vient de créer
module.exports = test ;