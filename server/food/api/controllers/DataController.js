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

  createFood : function(req,res){

    Food.find({id:req.param("id")}).exec(function findCB(err, found){
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
    res.send("SUCCESS");
  }

};

