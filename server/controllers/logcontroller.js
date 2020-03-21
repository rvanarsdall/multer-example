var express = require("express");
var router = express.Router();
var sequelize = require("../db");
var Log = sequelize.import("../models/log");
var bodyParser = require("body-parser");

var multer = require('multer')


const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, 'uploads')
  },
  filename: (req, file, callBack) => {
  
      callBack(null, `elevenFifty${Date.now()}${file.originalname.replace(/\s/g,'')
    }`)
  }
})

const upload = multer({ storage: storage })

router.get("/log", function(req, res) {
  var userid = req.user.id;
  Log.findAll({
    where: { owner: userid },
    order: [["id", "ASC"]]
  }).then(
    function findAllSuccess(data) {
      res.json(data);
    },
    function findAllError(err) {
      res.send(500, err.message);
    }
  );
});

router.post("/log", upload.single('file'), function(req, res, next) {
  // var owner = req.user.id;
  let file = req.file

  var description = req.body.description;
  var userid = req.user.id;
  Log.create({
    description: description,
    // definition: loggingData.definition,
    // result: loggingData.result,
    owner: userid,
    photourl: file.filename
  })
    .then(
      function createSuccess(loggingData) {
        res.json({
          loggingData: loggingData
        });
      },
      function createError(err) {
        res.send(500, err.message);
      }
    )
    .catch(function createError(err) {
      res.send(500, err.message);
    });
});
router.get("/log/:id", function(req, res) {
  var data = req.params.id;
  var userid = req.user.id;
  Log.findOne({
    where: { id: data, owner: userid }
  }).then(
    function findOneSuccess(data) {
      res.json(data);
    },
    function findOneError(err) {
      res.send(500, err.message);
    }
  );
});
router.put("/log/update/:id", function(req, res) {
  var data = req.params.id;
  var loggingData = req.body.log;
  var userid = req.user.id;

  Log.update(
    {
      description: loggingData.description,
      definition: loggingData.definition,
      result: loggingData.result
    },
    { where: { id: data, owner: userid } }
  ).then(
    function updateSuccess(updatedLog) {
      res.json({
        logData: updatedLog
      });
    },
    function updateError(err) {
      res.send(500, err.message);
    }
  );
});
router.delete("/log/delete/:id", function(req, res) {
  var data = req.params.id;
  var userid = req.user.id;
  Log.destroy({
    where: { id: data, owner: userid }
  }).then(
    function deleteLogSuccess(data) {
      res.send("you removed a log");
    },
    function deleteLogError(err) {
      res.send(500, err.message);
    }
  );
});
module.exports = router;
