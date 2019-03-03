const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const Task = require('../models/gantt/gantt_task')
const Link = require('../models/gantt/gantt_links')
const dateformat = require('dateformat');
const passport = require('passport');
require('../config/auth')(passport);


const app = express()
const dateFormat = "dd-mm-yyyy";
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


function convertBodyToTask(body) {
    return new Task({
        id: body.id,
        start_date: dateformat(body.start_date, dateFormat),
        text: body.text,
        progress: body.progress,
        duration: body.duration,
        sortOrder: body.sortOrder,
        parent: body.parent,
        projectId: body.projectId,
    })
}

function updateTaskFromBody(task, body) {
    if (body.start_date !== undefined) {
        task.start_date = dateformat(body.start_date, dateFormat);;
    }
    if (body.text !== undefined) {
        task.text = body.text;
    }
    if (body.progress !== undefined) {
        task.progress = body.progress;
    }
    if (body.duration !== undefined) {
        task.duration = body.duration;
    }
    if (body.parent !== undefined) {
        task.parent = body.parent;
    }
    if (body.projectId !== undefined) {
        task.projectId = body.projectId;
    }

    return task;
}
// Create task
app.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {
    var db = req.db;
    var task = convertBodyToTask(req.body);
    task.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true,
            task: task
        })
    })
})

// Find all task
app.get('/', (req, res) => {
    Task.find({}, function (error, tasks) {
        if (error) {
            console.error(error);
        }
        res.send({
            tasks: tasks
        })
    })

})

app.get("/withLinks", function (req, res) {
    var db = req.db;
    Task.find({}, function (err, rows) {
        if (err) {
            console.log(err);
        }
        Link.find({}, function (err, links) {
            if (err) {
                console.log(err);
            }
            res.send({
                 data:rows, collections: { links : links } 
            });
        });
    });
});

// Find task by id
app.get('/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    var db = req.db;
    Task.findOne({ id: req.params.id}, function (error, task) {
        if (error) {
            console.error(error);
        }
        res.send(task)
    })
})

// Update task by id
app.put('/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    var db = req.db;
    Task.findOne({ id: req.params.id}, function (error, task) {
        if (error) {
            console.error(error);
        }
        updateTaskFromBody(task, req.body);
        task.save(function (error) {
            if (error) {
                console.log(error)
            }
            res.send({
                success: true,
                task: task
            })
        })
    })
})

// Delete task by id
app.delete('/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    var db = req.db;
    Task.remove({
        id: req.params.id
    }, function (err, task) {
        if (err)
            res.send(err)
        res.send({
            success: true,
            task: task
        })
    })
})

module.exports = app;