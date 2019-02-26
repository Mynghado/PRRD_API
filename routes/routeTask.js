const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const Task = require('./../models/task')


const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


function convertBodyToTask(body) {
    return new Task({
        id: body.id,
        projectId: body.projectId,
        text: body.text,
        parent: body.parent,
        start_date: body.start_date,
        end_date: body.end_date,
        duration: body.duration,
        progress: body.progress,
        index: body.$index,
        level: body.$level,
        no_end: body.$no_end,
        no_start: body.$no_start,
        open: body.$open,
        rendered_parent: body.$rendered_parent,
        rendered_type: body.$rendered_type,
        source: body.$source,
        target: body.$target
    })
}

function updateTaskFromBody(task, body) {
    if(body.id !== undefined){
        task.id = body.id;
    }
    if(body.projectId !== undefined){
        task.projectId = body.projectId;
    }
    if(body.text !== undefined){
        task.text = body.text;
    }
    if(body.parent !== undefined){
        task.parent = body.parent;
    }
    if(body.start_date !== undefined){
        task.start_date = body.start_date;
    }
    if(body.end_date !== undefined){
        task.end_date = body.end_date;
    }
    if(body.duration !== undefined){
        task.duration = body.duration;
    }
    if(body.progress !== undefined){
        task.progress = body.progress;
    }
    if(body.index !== undefined){
        task.index = body.index;
    }
    if(body.level !== undefined){
        task.level = body.level;
    }
    if(body.no_end !== undefined){
        task.no_end = body.no_end;
    }
    if(body.no_start !== undefined){
        task.no_start = body.no_start;
    }
    if(body.open !== undefined){
        task.open = body.open;
    }
    if(body.rendered_parent !== undefined){
        task.rendered_parent = body.rendered_parent;
    }
    if(body.rendered_type !== undefined){
        task.rendered_type = body.rendered_type;
    }
    if(body.source !== undefined){
        task.source = body.source;
    }
    if(body.target !== undefined){
        task.target = body.target;
    }
    
    return task;
}
// Create task
app.post('/', (req, res) => {
    var db = req.db;
    var new_task = convertBodyToTask(req.body);
    new_task.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true,
            message: new_task
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

// Find task by id
app.get('/:id', (req, res) => {
    var db = req.db;
    Task.findById(req.params.id, function (error, task) {
        if (error) {
            console.error(error);
        }
        res.send(task)
    })
})

// Update task by id
app.put('/:id', (req, res) => {
    var db = req.db;
    Task.findById(req.params.id, function (error, task) {
        if (error) {
            console.error(error);
        }

        task = updateTaskFromBody(task, req.body)
        task.save(function (error) {
            if (error) {
                console.log(error)
            }
            res.send({
                success: true,
                message: task
            })
        })
    })
})

// Delete task by id
app.delete('/:id', (req, res) => {
    var db = req.db;
    Task.remove({
      _id: req.params.id
    }, function(err, task){
      if (err)
        res.send(err)
      res.send({
        success: true,
        message: task
      })
    })
  })



module.exports = app;