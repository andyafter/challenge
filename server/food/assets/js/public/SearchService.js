/**
 * Created by andypan on 30/7/15.
 */
var sBox = angular.module('searchBox', ['angular-advanced-searchbox']);


sBox.factory('SearchService', function() {
    var SearchService;
    SearchService = {};

    // The array that will contain search results
    SearchService.arrSearchResults = [];

    return SearchService;
  }
);

sBox.controller('ApplicationController', [
  '$scope', 'SearchService', function($scope, SearchService) {

    // Create a reference to the SearchService and add it to the
    // $scope so it will be available on the page
    $scope.searchService = SearchService;

  }
]);

sBox.controller('SearchController', ['$scope', 'SearchService', '$http', '$location', function($scope, SearchService, $http, $location) {

  // Your search input
  $scope.blab = "";

  // Your search function
  $scope.search = function() {

    // Make sure blab has content (always good to double check)
    if($scope.blab != "") {

      // Alter URL to show new request
      $location.search('q', $scope.blab);

      // Make a GET request to your URL that will
      // return data for you to populate
      $http.get('/someUrl').
        success(function(data, status, headers, config) {

          // this callback will be called asynchronously
          // when the response is available

          alert("Search results found!");

          // Assuming the data returned is a list of items
          // or object items
          // (i.e. [ "Search Result1", "Search Result2", ... ]
          SearchService.arrSearchResults = data;

        }).
        error(function(data, status, headers, config) {

          // called asynchronously if an error occurs
          // or server returns response with an error status.

          alert("Something failed! No results found!");

          // Empty the array of search results
          // to show no results
          SearchService.arrSearchResults = [];
        });
    };
  }}]);
