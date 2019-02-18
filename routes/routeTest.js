// *************************************************************
//
//  Fichier de route
//  Cette route aura un modèle de données associé dans ../models
//
// *************************************************************


// 1.
// Imports
const express = require('express');
const cors = require('cors');

const router = express();
router.use(cors({ origin: true }));



// 2.
// Création des routes

router.get('/get', function (req, res) {
    res.status(200).json({
        message: "Salutations !"
    })
});

router.put('/put', function (req, res) {
    res.status(200).json({
        message: "PUT REQUEST"
    })
});

router.post('/post', function (req, res) {
    res.status(200).json({
        message: "POST REQUEST"
    })
});

router.delete('/delete', function (req, res) {
    res.status(200).json({
        message: "DELETE REQUEST"
    })
});


// 3.
// On exporte le router que l'on a crée
module.exports = router;
