/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

    '/': {
	     view: 'homepage'
    },

    '/index': {
	     view: 'index'
    },


  'GET /test': {controller: "Foodctrl", action: "testAction"},
  'GET /another': {controller: "Foodctrl", action: "anotherAction"},
  //'GET /index': {controller: "Foodctrl", action: "index"},
  // record data is to put data in final.txt into the database
  // it only have to be used once
  'GET /testCreate': {controller: "Foodctrl", action: "testCreate"},
  'GET /testFind/:name?': {controller: "Foodctrl", action: "testFind"},
  //'POST /testPost': {controller:"DataController",action:"testPost"},

  // for a get request there must be a question mark.
  'GET /testPost/:name?/:id?': {controller: "DataController", action: "testPost"},
  'GET /createFood/:name?/:company?/:nutrition?/:id?': {controller: "DataController", action: "createFood"},
  'GET /simplyPrint/:name?/:company?/:nutrition?/:id?' :{controller: "DataController", action: "simplyPrint"},
  'GET /deleteFood/:id?': {controller: "DataController", action: "deleteFood"},
  'GET /queryPrevPart/:str?': {controller: "DataController", action: "queryPrevPart"},
  'GET /queryById/:id?': {controller: "DataController", action: "queryById"},
  'GET /queryContains/:str?': {controller: "DataController", action: "queryContains"},
  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};


