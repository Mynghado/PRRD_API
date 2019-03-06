const JWTstrategy = require('passport-jwt').Strategy;
//We use this to extract the JWT sent by the user
const ExtractJWT = require('passport-jwt').ExtractJwt;
var JsonStrategy = require('passport-json').Strategy;
const passport = require('passport');
const config = require("./config");
const UserModel = require('../models/model_user');

module.exports  = function (passport) {
  //Create a passport middleware to handle user registration
  passport.use('signup', new JsonStrategy({
    usernameProp: 'nomUtilisateur',
    passReqToCallback: true
  },async (req, nomUtilisateur, password, done) => {
    console.log(req.body);
    try {
      //Save the information provided by the user to the the database
      const user = await UserModel.create({
        nomUtilisateur: nomUtilisateur,
        nom: req.body.nom,
        prenom: req.body.prenom,
        role: req.body.role,
        password: password
      });
      //Send the user information to the next middleware
      return done(null, user);
    } catch (error) {
      done(error);
    }
  }));

  //Create a passport middleware to handle User login
  passport.use('login', new JsonStrategy({usernameProp: 'nomUtilisateur',}, async (nomUtilisateur, password, done) => {
    try {
      //Find the user associated with the email provided by the user
      const user = await UserModel.findOne({
        nomUtilisateur: nomUtilisateur
      });
      if (!user) {
        //If the user isn't found in the database, return a message
        return done(null, false, {
          message: "L'utilisateur n'existe pas"
        });
      }
      //Validate password and make sure it matches with the corresponding hash stored in the database
      //If the passwords match, it returns a value of true.
      const validate = await user.isValidPassword(password);
      if (!validate) {
        return done(null, false, {
          message: 'Mot de passe incorrecte'
        });
      }
      //Send the user information to the next middleware
      return done(null, user, {
        message: 'La connexion est un succes'
      });
    } catch (error) {
      return done(error);
    }
  }));


  //This verifies that the token sent by the user is valid
  passport.use(new JWTstrategy({
    //secret we used to sign our JWT
    secretOrKey: config.secret,
    //we expect the user to send the token as a query paramater with the name 'secret_token'
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("jwt")
  }, async (token, done) => {
    console.log(token);
    try {
      //Pass the user details to the next middleware
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  }));
}