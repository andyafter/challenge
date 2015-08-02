/**
* Food.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {


  attributes: {
    name : {
      type: 'string'
    },

    company : {
      type: 'string'
    },

    nutrition : {
      // for nutrition I'm gonna do the dirty thing
      // I'm gonna store everything as a string separated with ;
      // which means that the system will be easy to crack
      type: 'string'
    },

    id : {
      // id is actually a string of a 9 digit random number
      type: 'string',
      unique: true
    }


  }
};

