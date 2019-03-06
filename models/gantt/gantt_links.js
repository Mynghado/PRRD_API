var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var linkSchema = new Schema ({
    id: Number,
    source: Number,
    target: String,
    type: Number,
    projectId: {type: mongoose.Schema.Types.ObjectId , ref: "Project"},
});

// On associe un modèle mongo à notre schéma
// => Transformation du schéma en modèle
// INFO : le premier paramètre sera le nom de la collection dans mongoDB
var Link = mongoose.model("Gantt_link", linkSchema);

// 4.
// On exporte le modèle que l'on vient de créer
module.exports = Link;