/**
 * FoodctrlController
 *
 * @description :: Server-side logic for managing foodctrls
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require("fs");

module.exports = {

    testAction: function(req, res){
      res.send('hello world');
    },

    anotherAction : another,



    index : function(req,res){
      // this is to test a way to add html page but it seems to be more complicated
      var emberApp = __dirname + '/../../assets/templates/index.html';
      fs.exists(emberApp, function (exists) {
          if (!exists) {
        return res.notFound('The requested file does not exist.');
          }

          fs.createReadStream(emberApp).pipe(res);
      });

    },

    recordData : function(req,res){
      // take this as a logging proccedure
      console.log("recordingData");

    }

};

    function another(req,res){
      console.log("andyafter");
    }
