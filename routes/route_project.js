// *************************************************************
//  Fichier de route pour les Projets
//  Cette route aura un modèle de données associé dans ../models
//
//
//  http://localhost:8080/projet
//
//  Crée le 18/02/2019
// *************************************************************

// 1.
// IMPORTS
const express = require("express");
const cors = require("cors");
const mongodb = require('mongodb');

// Import du modèle associé
const modelProjet = require("../models/model_project")

// Instanciation du router
const router = express();
router.use(
    cors({
        origin: true
    })
);

// 2.
// METHODES GET / POST / PUT / DELETE

// GET ALL (OK)
router.get("/", function (req, res) {
    modelProjet.find({})
        .populate("listActors_fk")
        .populate("listTasks_fk")
        .then(function (p) {
            res.send(p);
        });
});


// GET ID (OK)
router.get("/:id", function (req, res) {
    modelProjet.findById({
            _id: req.params.id
        })
        .populate("listActors_fk")
        .populate("listTasks_fk")
        .then(function (p) {
            res.send(p);
        });
});


// POST (OK)
router.post("/", function (req, res) {
    console.log(req.body);
    modelProjet.create(req.body).then(function (p) {
        res.send(p);
    });
});


// PUT (OK)
// Ne pas oublier /:id
router.put("/:id", function (req, res) {
    console.log("L'element à mettre à jour est le " + req.params.id);

    // MàJ
    modelProjet.findByIdAndUpdate({
                _id: req.params.id
            },
            req.body
        )

        //Affichage de la MàJ
        .then(function () {
            modelTest.findOne({
                _id: req.params.id
            }).then(function (p) {
                res.send(p);
            });
        });
});


// DELETE (OK)
router.delete("/:id", function (req, res) {
    console.log("L'element à supprimer est le " + req.params.id);
    modelProjet.findByIdAndRemove({
        _id: req.params.id
    }).then(function (p) {
        res.send(p);
    });

});


// 3.
// EXPORT DU ROUTER
module.exports = router;