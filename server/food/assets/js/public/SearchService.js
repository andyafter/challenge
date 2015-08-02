/**
 * Created by andypan on 30/7/15.
 */
//var http = require('http');

var substringMatcher = function(strs) {
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

var food = [];
var last = 0;
var name2id = {};
$('#searchbox').on('input',function(){
  var t = $('#searchbox').val();
  var qurl = "http://127.0.0.1:1337/queryPrevPart?str="+t;
  var jData;


  if(t.length==2&&last<2){
    // every time the length equals 2 there is a query
    //states[0]="andy";
    // you can write something like a in b;
    food = [];
    //console.log(url);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", qurl, false );
    xmlHttp.send( null );
    jData=JSON.parse(xmlHttp.responseText);

    for(var i=0;i< jData.length;++i){
      console.log(food.length);
      food[i]=jData[i].name;
      console.log(food[i]);
      name2id[jData[i].name] = jData[i].id;
    }
    //console.log(xmlHttp.responseText);
    $('#searchbox').typeahead("destroy").typeahead({
        hint: true,
        highlight: true,
        minLength: 2,
        limit:10
      },
      {
        name: 'food',
        source: substringMatcher(food)
      });

  }
  console.log(food.length);
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
