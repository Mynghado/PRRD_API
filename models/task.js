var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var taskSchema = new Schema ({
    id: Number,
    projectId: Number,
    text: String,
    parent: Number,
    start_date: Date,
    end_date: Date,
    duration: Number,
    progress: Number,
    index: Number,
    level: Number,
    no_end: Boolean,
    no_start: Boolean,
    open: Boolean,
    rendered_parent: Number,
    rendered_type: String,
    source: [String],
    target: [String]
});

// On associe un modèle mongo à notre schéma
// => Transformation du schéma en modèle
// INFO : le premier paramètre sera le nom de la collection dans mongoDB
var Task = mongoose.model("Task", taskSchema);

// 4.
// On exporte le modèle que l'on vient de créer
module.exports = Task;