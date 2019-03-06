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
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const passport = require('passport');
require('../config/auth')(passport);


// Import du modèle associé
const modelUser = require("../models/model_user")

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
router.get("/", passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    modelUser.find({})
        .populate("listProjects_fk", "project_name description")
        .then(function (p) {
            res.send(p);
        });
});


// GET ID (OK)
router.get("/:id", passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    modelUser.findById({
            _id: req.params.id
        })
        .populate("listProjects_fk", "project_name description")
        .then(function (p) {
            res.send(p);
        });
});


// POST (OK)
router.post("/", passport.authenticate('signup', {
    session: false
}), async function (req, res, next) {
    res.json({
        message: 'Signup successful',
        user: req.user
    });
});

router.post('/login', async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try {
            if (err || !user) {
                return next(new Error(info.message));
            }
            req.login(user, {
                session: false
            }, async (error) => {
                if (error) return next(error)
                //We don't want to store the sensitive information such as the
                //user password in the token so we pick only the email and id
                const body = {
                    _id: user._id,
                    nomUtilisateur: user.nomUtilisateur
                };
                //Sign the JWT token and populate the payload with the user email and id
                const token = jwt.sign({
                    user: body
                }, config.secret);
                //Send back the token to the user
                return res.json({
                    token
                });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

// PUT (OK)
// Ne pas oublier /:id
router.put("/:id", passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    console.log("L'element à mettre à jour est le " + req.params.id);

    // MàJ
    modelUser.findByIdAndUpdate({
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
router.delete("/:id", passport.authenticate('jwt', {
    session: false
}), function (req, res) {
    console.log("L'element à supprimer est le " + req.params.id);
    modelUser.findByIdAndRemove({
        _id: req.params.id
    }).then(function (p) {
        res.send(p);
    });

});


// 3.
// EXPORT DU ROUTER
module.exports = router;