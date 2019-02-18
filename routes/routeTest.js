// *************************************************************
//
//  Fichier de route
//  Cette route aura un modèle de données associé dans ../models
//
// *************************************************************

// 1.
// Imports des nodes modules
const express = require("express");
const cors = require("cors");
const mongodb = require('mongodb');

// Import du modèle associé
const Test = require("./../models/modelTest")

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


router.post("/post", function (req, res) {
    console.log(req.body);
    Test.create(req.body).then(function (test) {
        res.send(test);
    });
});

router.put("/put", function (req, res) {
    res.status(200).json({
        message: "PUT REQUEST"
    });
});



router.delete("/delete", function (req, res) {
    res.status(200).json({
        message: "DELETE REQUEST"
    });
});

// 3.
// EXPORT DU ROUTER
module.exports = router;