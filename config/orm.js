var connection = require("./connection.js");

var orm = {
  selectAll: function(table, callback){
    var query = "SELECT * FROM " + table;
    connection.query(query, function(err, results){
      callback(results);
    });
  },

  insertOne: function(table, columns, values, callback){
    var query = "INSERT INTO " + table + " (" + columns.toString() + ") ";
    query += "VALUES(?, ?)";
    connection.query(query, values, function(err, results){
      callback();
    });
  },

  updateTable: function(table, id, callback){
    var query = "UPDATE " + table + " ";
    query += "SET devoured = ? ";
    query += "WHERE id = ?";
    connection.query(query, [1, id], function(err, results){
      callback();
    });
  }
}

module.exports = orm;
