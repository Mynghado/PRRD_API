// *************************************************************
//
//  Fichier de route
//  Cette route aura un modèle de données associé dans ../models
//
//  Crée le 18/02/2019
// *************************************************************

// 1.
// Imports
const express = require("express");
const cors = require("cors");
const mongodb = require('mongodb');


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

router.put("/put", function (req, res) {
    res.status(200).json({
        message: "PUT REQUEST"
    });
});

router.post("/post", function (req, res) {
    console.log(req.body);
    res.send({
        type: 'POST',
        nom: req.body.nom
    })
});

router.delete("/delete", function (req, res) {
    res.status(200).json({
        message: "DELETE REQUEST"
    });
});

// 3.
// EXPORT DU ROUTER
module.exports = router;