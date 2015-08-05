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
    // this is to find the food name which start with the input string
    console.log("Query With Previous Part!");

    // here I simply give the first 10 results
    // if there is any ranking algorithms it should be put here
    // Also there should be
    Food.find({name:{"startsWith":req.param("str")}}).exec(function findCB(err, found){
      console.log("Food that has "+req.param("str")+" as the prefix has " + found.length.toString()+" records.");
      var result = [];
      var n = 0;
      var a;
      while (found.length>0){
        a = found.pop();
        result[n] = {
          name : a.name,
          id : a.id
        };
        n+=1;
      }
      res.json(result);
      //while (found.length)
        //console.log('Found User with id ' + found.pop().id)
    });
  },

  queryContains: function (req,res){
    // this is to find the food name which contains the input string
    Food.find({name:{"contains":req.param("str")}}).exec(function findCB(err, found){
      console.log("Food names that contains "+req.param("str"));
      console.log(found.length);


      var result = [];
      var n = 0;
      var a;
      /*
      if (found.length<=10) {
        res.json(found);
        return;
      }
      else{
        res.json(found.slice(0,10));
        return;
      }*/
      while (found.length>0){
        a = found.pop();
        result[n] = {
          name : a.name,
          id : a.id
        };
        n+=1;
      }
      res.json(result);
      //console.log('Found User with id ' + found.pop().id)
    });
  },

  queryById: function(req,res){
    // return the nutrition
    // also for each food with id queried this way,
    // the record will also be stored inside Popularity database
    console.log("query by id "+req.param("id"));
    var result = {};
    var a;
    var t;
    var n=0;
    var foodName = "";

    if(req.param("id")) {
      Food.find({id: req.param("id")}).exec(function findCB(err, found) {
        if (found.length <= 0) {
          console.log("In queryById, food with id" + req.param("id") + "not found");
          return;
        }
        foodName = found[0].name;
        a = found[0].nutrition;
        t = a.split(';');
        while (n < t.length) {
          result[t[n]] = t[n + 1];
          n += 2;
        }
        res.json(result);
      });

      Popularity.find({id: req.param("id")}).exec(function findCB(err, found) {
        if (err) {
          console.log("Error in queryById, find Popularity instance function.");
          return;
        }
        if (found.length > 0) {
          found[0].count += 1;
          Popularity.update({id: req.param("id")}, {count: found[0].count + 1}).exec(function findCB(err, found) {
            if (err) {
              console.log("Error in queryById, during updating Popularity.");
              return;
            }
          });
        }
        else if (found.length == 0) {
          Popularity.create({
            name: req.param(foodName),
            id: req.param("id"),
            count: 1
          })
            .exec(function createCB(err, created) {
              console.log('Created user with name ' + created.name);
            });
        }
      });
    }
    else{
      console.log("id undefined!");
      res.send("id undefined!");
    }
  },


  matchSet: function (req,res){

    // same as queryPrevPart, in case the front end need some kind of
    // structured json for the returned value
    console.log("Query With Previous Part!");

    // here I simply give the first 10 results
    // if there is any ranking algorithms it should be put here
    // Also there should be
    Food.find({name:{"startsWith":req.param("str")}}).exec(function findCB(err, found){
      console.log("Food that has "+req.param("str")+" as the prefix has " + found.length.toString()+" records.");
      var result = [];
      var n = 0;
      var a;
      while (found.length>0){
        a = found.pop();
        result[n] = {
          name : a.name,
          id : a.id
        };
        n+=1;
      }
      res.json(result);
      //while (found.length)
      //console.log('Found User with id ' + found.pop().id)
    });
  },
};






