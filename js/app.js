'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', 
	['myApp.filters', 'myApp.services', 'myApp.directives'])
.controller("test",function( $scope, $timeout, $http){

  var items;
  var cache;
  

  $scope.$on("swift:file get", function( $event, path, callback ){
  	var output = [];
    console.log("begin to get files")
    if( cache ){
    	if( path.id in cache ){
    		output = cache[path.id]
    	}
    	callback(output)
    }else{
      $http.get('../data/data.json').success(function(response){
        cache = response;
        if( path.id in cache ){
          output = cache[path.id]
        }
        callback(output)
      });
    }
  })

  $timeout( function(){
    console.log("fire")
    $scope.$broadcast("swift:path change", {id:'i1',level:0, name:'i1'})  
  }, 1000)
})

