describe('Unit testing for swiftpath', function() {
    var $compile;
    var $rootScope;
    var $timeout;
    var data = { 
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
      }
 
    beforeEach( module('myApp'));
 
    beforeEach( inject(function(_$compile_, _$rootScope_, _$timeout_){
        $timeout = _$timeout_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    var pathChangeEvent = "swift:path change";
    var fileGetEvent = "swift:file get";
    var fileGotEvent = "swift:file got";
    var template = '<swift-paths class="swiftList-paths"'
        +' swift-paths="paths" swift-path-type="folder"'
        +' swift-path-change-event="'+ pathChangeEvent +'"'
        +' swift-path-data="files">'
        +'</swift-paths>'

    var getData = function( id ){
        var output = []
        if( id in data ){
            output = data[id]
        }
        return output;
    }
    var changeParentPath = function( paths, files, path, $scope ){
        paths.push( path )
        files.splice(0);
        var data = getData( path.id )
        for( var i in data){
            files.push( data[i])
        }
        $scope.$broadcast( pathChangeEvent, path );
    }

    it('paths  should act right after parent scope change', function() {
        // Compile a piece of HTML containing the directive
        var initPath = {id:'i1',level:0, name:'i1'};
        var $parentScope = $rootScope.$new();
        

        $parentScope.paths = [];
        $parentScope.files = [];


        var element = $compile(template)($parentScope);

        changeParentPath( $parentScope.paths, $parentScope.files, 
             initPath, $parentScope );

        var flag
        runs(function() {
            $parentScope.$digest()
          flag = false;

          setTimeout(function() {
            flag = true;
          }, 500);
        });


        waitsFor(function() {
            return flag;
        }, "", 750);

        runs(function() {

            var $pathScope = angular.element(element).scope()
            console.log( "expecting scope act right.")
            expect( $pathScope.paths.length ).toEqual(2);
            expect( $pathScope.paths[0].current.id ).toEqual( initPath.id );
            expect( $pathScope.paths[0].siblings ).toEqual(undefined);
            expect( $pathScope.paths[1].current ).toEqual(null);
            expect( $pathScope.paths[1].siblings.length ).toEqual( getData( initPath.id ).length );
            
            console.log("expecting view act right.")
            expect( angular.element(element).children().length ).toEqual( 2 )
            expect( angular.element(element).children().first()
                .children().last().css("display")).toEqual("none")
            console.log( angular.element( element ).children().last().find("select").html())
            expect( 
                angular.element( element ).children().last()
                .find("select").children("option").length
                ).toEqual( getData(initPath.id).length + 1 )
        })
    });
});

// describe('Unit testing for swiftlist',function(){

//     var $compile;
//     var $rootScope;
 
//     beforeEach( module('myApp'));
 
//     beforeEach( inject(function(_$compile_, _$rootScope_){
//       $compile = _$compile_;
//       $rootScope = _$rootScope_;
//     }));


// });
