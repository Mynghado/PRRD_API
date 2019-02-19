// ************************************************************
//  Fichier de modèle pour les Acteurs
//  Ce modèle de données aura une route associée dans ../routes
//  Ce modèle importe le module mongoose
//  Tous les objets de ce type pourront utiliser les méthodes natives de mongoose
//
//  Crée le 19/02/2019
// ************************************************************

// 1.
// IMPORTS
var mongoose = require("mongoose");

// 2.
// On déclare notre schéma de données
// => Données attendues par mongo
var schemaProjet = new mongoose.Schema({
  nom: String,
  prenom: String,
  role: String,
});

// 3.
// On associe un modèle mongo à notre schéma
// => Transformation du schéma en modèle
// INFO : le premier paramètre sera le nom de la collection dans mongoDB
var modeleProjet = mongoose.model("projet", schemaProjet);

// 4.
// On exporte le modèle que l'on vient de créer
module.exports = modeleProjet;
