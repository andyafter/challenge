/**
* Popularity.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  // store the names

  attributes: {
    name : {
      type: 'string'
    },

    id : {
      // id is actually a string of a 9 digit random number
      type: 'string',
      unique: true
    },

    count : {
      // count how many times this food name has been queried(by Id)
      type : "integer",
      defaultsTo: 0
    }
  }
};

