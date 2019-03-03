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
var project = require("./model_project");
const bcrypt = require('bcrypt');


// 2.
// On déclare notre schéma de données
// => Données attendues par mongo
var schemaUser = new mongoose.Schema({
  nomUtilisateur: {type : String, unique: true},
  nom: String,
  prenom: String,
  role: String,
  password : String,
  listProjects_fk : [{type: mongoose.Schema.Types.ObjectId , ref: "Project"}],
});

//This is called a pre-hook, before the user information is saved in the database
//this function will be called, we'll get the plain text password, hash it and store it.
schemaUser.pre('save', async function(next){
  //'this' refers to the current document about to be saved
  const user = this;
  //Hash the password with a salt round of 10, the higher the rounds the more secure, but the slower
  //your application becomes.
  const hash = await bcrypt.hash(this.password, 10);
  //Replace the plain text password with the hash and then store it
  this.password = hash;
  //Indicates we're done and moves on to the next middleware
  next();
});

//We'll use this later on to make sure that the user trying to log in has the correct credentials
schemaUser.methods.isValidPassword = async function(password){
  const user = this;
  //Hashes the password sent by the user for login and checks if the hashed password stored in the 
  //database matches the one sent. Returns true if it does else false.
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}

// 3.
// On associe un modèle mongo à notre schéma
// => Transformation du schéma en modèle
// INFO : le premier paramètre sera le nom de la collection dans mongoDB
var modeleUser = mongoose.model("User", schemaUser);

// 4.
// On exporte le modèle que l'on vient de créer
module.exports = modeleUser;
