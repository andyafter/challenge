// providing a schema and model for the database
var lazy = require("lazy");
var fs = require("fs");
var mongoose = require('mongoose');
var db = mongoose.connection;
var FoodSchema = mongoose.Schema({
    name: String
    company: String
    ID : String     // gotta find a way to do some hashing to get an ID
    
});


/*
new lazy(fs.createReadStream('../scraper/final.txt'))
     .lines
     .forEach(function(line){
         console.log(line.toString().split('     ').length);
     }
 );
*/