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
    projectId: Number,
});

// On associe un modèle mongo à notre schéma
// => Transformation du schéma en modèle
// INFO : le premier paramètre sera le nom de la collection dans mongoDB
var Task = mongoose.model("gantt_task", taskSchema);

// 4.
// On exporte le modèle que l'on vient de créer
module.exports = Task;