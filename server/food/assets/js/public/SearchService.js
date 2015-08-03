/**
 * Created by andypan on 30/7/15.
 */
//var http = require('http');


var food = [];
var last = 0;
var name2id = {};
var popular;
// this one is used for the comparison from all the query results and the result from
// popularity database

var substringMatcher = function(strs) {

  // any algorithms must be from here;
  // there should be  Levenshtein algorithm here
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};



$('#k').on('input',function(){
  var t = $('#k').val();

  var qurl = "http://127.0.0.1:1337/queryPrevPart?str="+t;

  if(t.length==2&&last<2){
    // every time the length equals 2 there is a query

    console.log(t);
    food = [];
    // I know this type of query is dirty,
/*    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", qurl, false );
    xmlHttp.send( null );
    jData=JSON.parse(xmlHttp.responseText);*/
    io.socket.get(qurl, function (data, jwres){
      for(var i=0;i< data.length;++i){
        //console.log(food.length);
        food[i]=data[i].name;
        //console.log(food[i]);
        name2id[data[i].name] = data[i].id;
      }
      //console.log(xmlHttp.responseText);
      $('#k').typeahead("destroy").typeahead({
          hint: true,
          highlight: true,
          minLength: 2,
          limit:10
        },
        {
          name: 'food',
          source: substringMatcher(food)
        });
      $('#k').focus();
    });
  }
  //console.log(food.length);
  last = t.length;

});

$('#searchbox').typeahead({
    hint: true,
    highlight: true,
    minLength: 2,
    limit:10
  },
  {
    name: 'food',
    source: substringMatcher(food)
  });


function searchId(){
  console.log($("#searchbox").val());
  var qurl = "http://127.0.0.1:1337/queryById?id="+name2id[$("#searchbox").val()];
  window.location.replace(qurl);
}
