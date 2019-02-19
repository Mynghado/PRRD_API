// *************************************************************
//  Fichier de route pour les tests
//  Ce fichier servira également de référence pour les futures routes
//  A utiliser uniquement en intégration
//  Cette route aura un modèle de données associé dans ../models
//
// *************************************************************

// 1.
// Imports des nodes modules
const express = require("express");
const cors = require("cors");
const mongodb = require("mongodb");

// Import du modèle associé
const modelTest = require("./../models/modelTest");

const router = express();
router.use(
    cors({
        origin: true
    })
);

// 2.
// METHODES GET / POST / PUT / DELETE
router.get("/get", function (req, res) {
    res.status(200).json({
        message: "Salut !"
    });
});

// POST (OK)
router.post("/post", function (req, res) {
    console.log(req.body);
    modelTest.create(req.body).then(function (test) {
        res.send(test);
    });
});

// PUT
// Ne pas oublier /:id
router.put("/put/:id", function (req, res) {
    console.log("L'element à mettre à jour est le " + req.params.id);

    // MàJ
    modelTest.findByIdAndUpdate({
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
// Ne pas oublier /:id
router.delete("/delete/:id", function (req, res) {
    console.log("L'element à supprimer est le " + req.params.id);

    // Suppression
    modelTest
        .findByIdAndRemove({
            _id: req.params.id
        })

        // Affichage de l'élément supprimé
        .then(function (p) {
            res.send(p);
        });

    // voir la gestion des codes plus tard
    // res.status(200).json({
    //     message: "DELETE REQUEST"
    // });
});

// 3.
// EXPORT DU ROUTER
module.exports = router;