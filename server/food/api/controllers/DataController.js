/**
 * DataController
 *
 * @description :: Server-side logic for managing data
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  testPost : function(req,res){
    console.log(req.param("name"));
    console.log(req.param("id"));
    Test.create({name:req.param("name"),id:req.param("id")}).exec(function createCB(err, created){
      console.log('Created user with name ' + created.name);
    });
    res.send("SUCCESS");
  },

  simplyPrint : function(req,res){
    // a function to test whether there will be encoding problems when the request arrives.
    console.log(req);
    console.log(req.param("name"));
    console.log(req.param("company"));
    console.log(req.param("nutrition"));
    console.log(req.param("id"));
    res.send("don't poke me!!");

  },

  createFood : function(req,res){

    Food.find({id:req.param("id")}).exec(function findCB(err, found){
      if (err){
        console.log(err);
      }
      if (found.length==0) {
        Food.create({
          name: req.param("name"),
          company: req.param("company"),
          nutrition: req.param("nutrition"),
          id: req.param("id"),
        })
          .exec(function createCB(err, created) {
            console.log('Created user with name ' + created.name);
          });
      }
      else{
        console.log("Food Already Exist!");
      }
    });
    res.send("Finished");
  },

  deleteFood: function(req,res){
    Food.destroy({id:req.param("id")}).exec(function deleteCB(err){
      if (err){
        console.log(err);
      }
      console.log('The record has been deleted');
    });

    res.send("Record Destroyed!");
  },

  queryPrevPart: function (req,res){
    console.log("Query With Previous Part!");

    // here I simply give the first 10 results
    // if there is any ranking algorithms it should be put here
    // Also there should be
    Food.find({name:{"startsWith":req.param("str")}}).exec(function findCB(err, found){
      if (found.length<=10) {
        res.json(found);
        return;
      }
      else{
        res.json(found.slice(0,10));
        return;
      }
      //while (found.length)
        //console.log('Found User with id ' + found.pop().id)
    });

    console.log("herehere");

  },

  queryById: function(req,res){
    console.log("query by id"+req.param("id"));
    Food.find({id:req.param("id")}).exec(function findCB(err, found){
      res.json(found);
    });
  }

};

