// ************************************************************
//
//  Fichier de modèle
//  Ce modèle de données aura une route associée dans ../routes
//  
//  Crée le 18/02/2019
// ************************************************************


// 1.
// IMPORT
var mongoose = require('mongoose');


// 2.
// On déclare notre schéma de données
// => Données attendues par Mongo
var testSchema = new mongoose.Schema({
    project_manager: String,
    project_director: String,
    project_team: String,
    description: String,
    marker: String,
    deliverable: String,
    human_resources: String,
    material_resources: String,
    it_resources: String,
    planned_budget: String,
    partners: String,
});


// 3.
// On associe un objet mongo à notre schéma
var projet = mongoose.model('projet', testSchema);


// 4.
// On exporte le module que l'on vient de créer
module.exports = projet;