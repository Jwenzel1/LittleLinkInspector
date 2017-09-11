var express = require("express");
var burger = require("../models/burger.js");

var router = express.Router();

router.get("/", function(req, res){
  burger.getAllBurgers(function(burgers){
    res.render("index", burgers);
  });
});

router.post("/", function(req, res){
  burger.addBurger(req.body.burgerText, function(){
    res.redirect("/");
  })
});

router.put("/:id", function(req, res){
  burger.eatBurger(req.params.id, function(){
    res.redirect("/");
  });
});


module.exports = router;