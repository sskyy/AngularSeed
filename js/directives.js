'use strict';

/* Directives */

angular.module("myApp.directives",['ui','ngGrid'])
.directive('swiftGrid',function( $compile){

	return {
		scope : true,
		template : '<div><div ng-grid="gridOptions"></div></div>',
		compile : function(){
			return {
				pre : function( $scope, $ele, $attr ){
					
				  	var options = JSON.parse($attr['swiftGrid'])
					$scope.gridOptions = {
						data : options.data,
						columnDefs: [
							{field:'id', 
								cellTemplate: '<div ng-click="enter(row.entity)" class="ngCellText">{{row.getProperty(col.field)}}</div>'},
							{field:"name"},
							{field:"level"}
						]
					}
					$scope.enter = function( entity ){
						$scope.$parent[options.click](entity)
					}
					
					$scope.$parent.$watch( options.data, function( data ){
						if( data === undefined ){
							return;
						}
						// console.log("ng-grid get the data ", data )
						$scope[options.data]  = $scope.$parent[options.data]
					})

					// console.log( $scope, options)
				}
			}

		},	
  }
}).directive('swiftList',function(){
    var pathChangeEvent = "swift:path change";
    var fileGetEvent = "swift:file get";
    var fileGotEvent = "swift:file got";
  	return {
		template: '<div class="swiftList">'
		+'<swift-paths class="swiftList-paths"'
		+' swift-paths="paths" swift-path-type="folder"'
		+' swift-path-change-event="'+ pathChangeEvent +'"'
		+' swift-path-data="files">'
		+'</swift-paths>'
  		+'<div class="swiftList-grid" '
  		+' swift-grid=\'{\"data\":\"files\",\"click\":\"changePath\"}\'>'
  		+'</div>'
  		+'</div>',
		restrict: 'A',
		scope: true,
		link : function( $scope  ){
    
			$scope.changePath = function( path ){
				if( !("paths" in $scope ) ){
					$scope.paths = [];
				}


				if( $scope.paths.length === 0 ){
					$scope.paths.push( path );
				}else{
					if( path.level < $scope.paths.length - 1 ){
						$scope.paths.splice( path.level + 1 );
					}
					$scope.paths[path.level] = path;
				}

				$scope.$emit( fileGetEvent, path, function( files ){
					$scope.files = angular.copy( files )
					// console.log("file got!", files );
				})
	      
			}

			//using $scope even
			$scope.$on(pathChangeEvent, function( $event, path){
	  			// console.log("test1 path change heppend, path:", path)
				$scope.changePath( path )
			})
    
		}
  	}
}).directive('swiftPaths',function(){
	return {
		template:'<div ng-repeat="path in paths" ng-show="path.current">'
			+'<div ng-show="!path.siblings">{{path.current.name}}</div>'
			+'<div ng-show="path.current&&path.siblings">'
			+'<select ng-show="path.siblings" ui-select2 ng-model="path.current_id"  style="width:100px">'
			+'<option></options>'
		    +'<option ng-repeat="sibling in path.siblings" value="{{sibling.id}}">{{sibling.name}}</option>'
		  	+'</select>'
		  	+'</div>'
		  	+'</div>',
		restrict: "A",
		scope:true,
		link : function( $scope, $elem, $attr ){
			var pathName = $attr['swiftPaths'];
			var dataName = $attr['swiftPathData'];
			var typeName = $attr['swfitPathType'];
			var pathChangeEvent = $attr['swiftPathChangeEvent'];
			$scope.paths = [];

			var generatePath = function( path, siblings ){
				var path = {
					_path : angular.copy( path ),
					_current_id : null,
					set current( newVal ){
						this._path = newVal
						if( "id" in newVal ){
							this._current_id = newVal.id
						}
					},	
					get current(){
						return this._path;
					},
					set current_id( newId ){
						if( !newId ){
							return;
						}
						for( var i in this.siblings ){
							if( this.siblings[i].id === newId ){
								this.current = this.siblings[i];
								break;
							}
						}
						$scope.resetPath( this.current )
					},
					get current_id(){
						if( !this._current_id ){
							if( this._path ){
								return this._path.id
							}
						}else{
							return this._current_id
						}
					},
					siblings : siblings
				};

				


		  
				if( siblings === false ){
					delete path.siblings
				}else if( siblings === undefined ){
					path.siblings = [];
				}
		      
		      return path;
			}

			var filterForFolder = function( files ){
				var folders = [];
				for( var i in files){
					if( files['type'] == typeName ){
						folders.push(files[i])
					}
				}
				return folders;
			}

			//this only happens when user enter a new folder or backward
			$scope.$parent.$watch( pathName+".length", function( pathsLength){
					//already added by data get callback.
				if( !pathsLength || pathsLength === 0 ){
					return ;
				}

				//trigger by select2.
				if( pathsLength === $scope.paths.length - 1  ){
					return;
				}

		  		var newPaths = $scope.$parent[pathName];
				var newLastPath = newPaths[newPaths.length-1]
				
				//the first path know as container
				$scope.changePath( newLastPath, pathsLength == 1 );
			
				console.log( "test3. paths changed newPaths:", newPaths, "current paths:", JSON.stringify($scope.paths) )
			})

			$scope.$parent.$watch( dataName, function( files, oldFiles ){ 
		        if( files === undefined ){
		        	return ;
		      	}
				// console.log( "files changed",files, oldFiles, arguments  )
				var folders = filterForFolder( files );
				var lastPath = $scope.paths[$scope.paths.length-1];

				//path not generated. need to be generate.
	        	var path = generatePath( null, folders )
				$scope.paths.push( path )
				console.log( "test4. files getting done. files:", files,"paths:", JSON.stringify( $scope.paths))
			});

			$scope.changePath = function( path, first ){
				first = first || false

				if( first && $scope.paths.length == 0 ){
					var newPath = generatePath( path )
					delete newPath.siblings;
					$scope.paths.push( newPath )
				}else{
					
					if( path.level < $scope.paths.length - 1 ){
						//backward
						$scope.paths[path.level].current = path;
						$scope.paths.splice( path.level + 1 )
						
					}else{
						//forward or current
						$scope.paths[path.level].current = path
					}
				}	
				console.log("changed paths :", path, JSON.stringify( $scope.paths ))

			}

			$scope.resetPath = function( path, first ){
				$scope.changePath( path, first );
				$scope.$emit(pathChangeEvent, path);
			}
		}
	}
})
