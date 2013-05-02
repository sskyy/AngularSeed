'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', 
	['myApp.filters', 'myApp.services', 'myApp.directives'])
.controller("test",function( $scope, $timeout, $http){

  var items;
  var cache = { 
  "i1" : [
    {"id":"i2", "name":"i2", "level":1},
    {"id":"i3", "name":"i3", "level":1},
    {"id":"i4", "name":"i4", "level":1}
    ],
  "i2" : [
    {"id":"i4", "name":"i4", "level":2},
    {"id":"i5", "name":"i5", "level":2},
    {"id":"i6", "name":"i6", "level":2}
    ],
  "i4" : [
    {"id":"i7", "name":"i7", "level":3},
    {"id":"i8", "name":"i8", "level":3},
    {"id":"i9", "name":"i9", "level":3}
    ],
  "i5" : [
    {"id":"i10", "name":"i10", "level":3},
    {"id":"i11", "name":"i11", "level":3},
    {"id":"i12", "name":"i12", "level":3}
    ]

  };
  

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
        callback(cache[path.id])
      });
    }
  })

  $timeout( function(){
    console.log("fire")
    $scope.$broadcast("swift:path change", {id:'i1',level:0, name:'i1'})  
  }, 1000)
})
.controller("test2", function( $scope, $compile){

$scope.myData = [
    {"id":"i10", "name":"i10", "level":3},
    {"id":"i11", "name":"i11", "level":3},
    {"id":"i12", "name":"i12", "level":3}
    ];
    
	$scope.gridOptions = {
		data : 'myData',
		columnDefs: [
			{field:'id', 
				cellTemplate: '<div ng-click="enter(row.entity)" class="ngCellText">{{row.getProperty(col.field)}}</div>'},
			{field:"name"},
			{field:"level"}
		]
	}

	// $("#test2").append( $compile('<div ng-grid="gridOptions"></div>')($scope ) )
})
.controller("test3", function( $scope, $compile){

$scope.myData = [
    {"id":"i10", "name":"i10", "level":3},
    {"id":"i11", "name":"i11", "level":3},
    {"id":"i12", "name":"i12", "level":3}
    ];
    
	$scope.gridOptions = {
		data : 'myData',
		columnDefs: [
			{field:'id', 
				cellTemplate: '<div ng-click="enter(row.entity)" class="ngCellText">{{row.getProperty(col.field)}}</div>'},
			{field:"name"},
			{field:"level"}
		]
	}

console.log( $compile('<div ng-grid="gridOptions"></div>')($scope ))
	$("#test3").append( $compile('<div ng-grid="gridOptions"></div>')($scope ) )
})
