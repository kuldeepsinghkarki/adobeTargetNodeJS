var express = require("express");
var router = express.Router();
var myFeature = require("../utils/targetUtils.js");


function setFeature(feature){
  myFeature = feature;
}

router.get("/view", function (req, res) {
  res.send(
    '<h1 style="color:red;">Walgreens Demo</h1>' +
     '<h2 style="color:blue;">Currently Active Feature is :'+myFeature.getCurrentFeatureValue()+'</h2>'
  );
});

module.exports={router,setFeature};
