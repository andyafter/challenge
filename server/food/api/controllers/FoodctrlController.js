/**
 * FoodctrlController
 *
 * @description :: Server-side logic for managing foodctrls
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require("fs");
var lazy = require("lazy");

module.exports = {

    testAction: function(req, res){
      res.send('hello world');
    },

    anotherAction : function(req,res){
      console.log("andyafter");
      console.log("andy|after".split('|'))
    },

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



    testCreate : function(req,res){
      Test.create({name:'Andy Pan'}).exec(function createCB(err, created){
        console.log('Created user with name ' + created.name);
      });
      res.send("success");
    },

    testFind : function(req,res){
      Food.find({}).exec(function findCB(err, found){ //name:req.param("name")
        //if (found.length>=1){
        console.log(found.length);
          //return;
        //}
        //while (found.length)
          //console.log('Found User with id ' + found.pop().id)
      });
      res.send("success");

    },

    testView:function(req,res){
      var r = {title:"testresponse",h1:"new"};
      res.view('table');
    }

};
