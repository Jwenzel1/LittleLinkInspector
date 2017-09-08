var orm = require("../config/orm.js");

var burger = {
  getAllBurgers: function(callback){
    orm.selectAll("burgers", function(results){
      var devoured = [];
      var notDevoured = [];
      var returnObj = {};
      for(burger of results){
        if(burger.devoured){
          devoured.push(burger);
        }
        else{
          notDevoured.push(burger);
        }
      }
      returnObj.devoured = devoured;
      returnObj.notDevoured = notDevoured;
      callback(returnObj);
    });
  },

  eatBurger: function(burgerID, callback){
    orm.updateTable("burgers", burgerID, function(err){
      callback();
    });
  },

  addBurger: function(burgerText, callback){
    burgerText = burgerText.trim();
    if(burgerText){
      var columns = ["burger_name", "devoured"];
      var values = [burgerText, 0];
      orm.insertOne("burgers", columns, values, function(){
        callback();
      });
    }
    else{
      callback();
    }
  }
}

module.exports = burger;
