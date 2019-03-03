// ************************************************************
//
//  Fichier de modèle
//  Ce modèle de données aura une route associée dans ../routes
//
// ************************************************************

// 1.
// IMPORT
var mongoose = require('mongoose');


// 2.
// On déclare notre schéma de données
// => Données attendues par Mongo
var testSchema = new mongoose.Schema({
    nom: String,
    age: Number,
    
});


// 3.
// On associe un objet mongo à notre schéma
var test = mongoose.model('test', testSchema);


// 4.
// On exporte le module que l'on vient de créer
module.exports = test ;