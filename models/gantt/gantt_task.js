var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var taskSchema = new Schema ({
    id: Number,
    start_date: String,
    text: String,
    progress: Number,
    duration: Number,
    sortorder: Number,
    parent: Number,
    projectId: {type: mongoose.Schema.Types.ObjectId , ref: "Project"},
});

// On associe un modèle mongo à notre schéma
// => Transformation du schéma en modèle
// INFO : le premier paramètre sera le nom de la collection dans mongoDB
var Task = mongoose.model("Gantt_task", taskSchema);

// 4.
// On exporte le modèle que l'on vient de créer
module.exports = Task;