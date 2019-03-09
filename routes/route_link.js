const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const Link = require('../models/gantt/gantt_links')
const passport = require('passport');
require('../config/auth')(passport);

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())


function convertBodyToLink(body) {
    return new Link({
        id: body.id,
        source: body.source,
        target: body.target,
        type: body.type,
        projectId: body.projectId,
    })
}

function updateLinkFromBody(link, body) {
    if(body.id !== undefined){
        link.id = body.id;
    }
    if(body.source !== undefined){
        link.source = body.source;
    }
    if(body.target !== undefined){
        link.target = body.target;
    }
    if(body.type !== undefined){
        link.type = body.type;
    }
    
    return link;
}
// Create link
app.post('/', passport.authenticate('jwt', { session: false}), (req, res) => {
    var db = req.db;
    var new_link = convertBodyToLink(req.body);
    new_link.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true,
            link: new_link
        })
    })
})

// Find all link
app.get('/', passport.authenticate('jwt', { session: false}), (req, res) => {
    Link.find({}, function (error, links) {
        if (error) {
            console.error(error);
        }
        res.send({
            links: links
        })
    }).populate("projectId")

})

// Find link by id
app.get('/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    var db = req.db;
    Link.findOne({ id: req.params.id}, function (error, link) {
        if (error) {
            console.error(error);
        }
        res.send(link)
    }).populate("projectId")
})

// Update link by id
app.put('/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    var db = req.db;
    Link.findOne({ id: req.params.id}, function (error, link) {
        if (error) {
            console.error(error);
        }

        updateLinkFromBody(link, req.body)
        link.save(function (error) {
            if (error) {
                console.log(error)
            }
            res.send({
                success: true,
                link: link
            })
        })
    }).populate("projectId")
})

// Delete link by id
app.delete('/:id', passport.authenticate('jwt', { session: false}), (req, res) => {
    var db = req.db;
    Link.remove({
      id: req.params.id
    }, function(err, link){
      if (err)
        res.send(err)
      res.send({
        success: true,
        link: link
      })
    })
  })



module.exports = app;