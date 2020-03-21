var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var User = sequelize.import("../models/user");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

router.post("/createuser", function(req, res) {
  //   var userName = "fake@fake.com";
  //   var password = "ThisIsAPassword";

  var userName = req.body.user.username;
  var password = req.body.user.password;

  User.create({
    username: userName,
    passwordhash: bcrypt.hashSync(password, 10)
  }).then(
    function createSuccess(user) {
      var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
      });
      res.json({
        user: user,
        message: "created",
        sessionToken: token
      });
    },
    function createError(err) {
      res.send(500, err.message);
    }
  );
});

// SIGNING IN A USER
router.post("/signin", function(req,res){
    let email = req.body.user.username
    let password = req.body.user.password

    User.findOne({
        where:{username: email }
    }).then(user => {


        user ? comparePasswords(user) :res.send("User not found in our database")

        function comparePasswords(user){
            bcrypt.compare(password, user.passwordhash, function (err, matches){
                matches ? generateToken(user) : res.send("Incorrect Password")
            })
        }

        function generateToken(user){

            var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24
              });
              res.json({
                user: user,
                message: "logged in",
                sessionToken: token
              });

        }
        
    })

})

module.exports = router;
