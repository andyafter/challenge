/**
 * Created by andypan on 31/7/15.
 */
// this one is to test angular bootstrap

//var c = require("");
var personApp = angular.module('personApp', []);

personApp.controller('PersonListCtrl', function ($scope, $http) {
  $http.get('data/persons.json').success(function(data) {
    $scope.persons = data;
  });

});


function testB() {
  $("#test").text("changed");

}
