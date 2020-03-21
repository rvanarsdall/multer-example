var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var User = sequelize.import("../models/user");
var AuthTestModel = sequelize.import("../models/authtest");
/// localhost:3000/authtest/getall (GET,POST,UPDATE, DELETE)
router.get("/getall", function(req, res) {
  // Grabbing all of the Grocery List items from database for
  // a given user
  //select * from AuthTest where owner = '3'
  var userid = req.user.id;
  AuthTestModel.findAll({
    where: { owner: userid }
  }).then(
    function findAllSuccess(data) {
      res.json(data);
    },
    function findAll(err) {
      res.send(500, err.message);
    }
  );
});

/// Posting data for a given user
// localhost:3000/authtest/create
// WHAT GOES IN THE BODY?
// {authtestdata: {item:"Something in here" }

// let body= {authtestdata: {item:"Apple" }
router.post("/create", function(req, res) {
  var owner = req.user.id;
  var authTestData = req.body.authtestdata.item;
  AuthTestModel.create({
    authtestdata: authTestData,
    owner: owner
  }).then(
    function createSuccess(authtestdata) {
      res.json({
        authtestdata: authtestdata
      });
    },
    function createError(err) {
      res.send(500, err.message);
    }
  );
});

// Sometimes you want to get a single item that belongs to that user...

// Find a single item

// localhost:3000/authtest/[Primary Key Number]
// localhost:3000/authtest/10
router.get("/:id", function(req, res) {
  var primaryKey = req.params.id;
  var userid = req.user.id;
  AuthTestModel.findOne({
    where: { id: primaryKey, owner: userid }
  }).then(data => {
    return data /*if not null*/
      ? res.json(data) /*display data*/
      : res.send("Not Authorized to view row") /*else show error*/;
  }),
    err => res.send(500, err.message);
});
// [/delete/[number]]
// localhost:3000/authtest/delete/11
router.delete("/delete/:id", function(req, res) {
  var primaryKey = req.params.id;
  var userid = req.user.id;

  AuthTestModel.destroy({
    where: { id: primaryKey, owner: userid }
  }).then(data => {
    return data > 0
      ? res.send("Item was deleted")
      : res.send("Nothing deleted");
  }),
    err => res.send(500, err.message);
});
// Updating Record for the individual
// Endpoint: /update/[number here]
// Actual URL: localhost:3000/authest/update/10
router.put("/update/:id", function(req, res) {
  var userid = req.user.id;
  var primaryKey = req.params.id;
  var authtestdata = req.body.authtestdata.item;

  AuthTestModel.update(
    {
      authtestdata: authtestdata
    },
    { where: { id: primaryKey, owner: userid } }
  ).then(data => {
    return res.json(data);
  }),
    err => res.send(500, err.message);
});
module.exports = router;
