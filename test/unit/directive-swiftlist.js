describe('Unit testing for swiftpath', function() {
    var $compile;
    var $rootScope;
 
    beforeEach( module('myApp'));
 
    beforeEach( inject(function(_$compile_, _$rootScope_){
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));
    
    it('Replaces the element with the appropriate content', function() {
        // Compile a piece of HTML containing the directive
        var element = $compile("<div swiftlist></div>")($rootScope);
        // Check that the compiled element contains the templated content
        console.log( element[0].toString())
        window.setTimeout(function(){
            expect(element.children(".swift-path").length).toEqual(2);

        },100)
    });
});

discribe('Unit testing for swiftlist',function(){

    var $compile;
    var $rootScope;
 
    beforeEach( module('myApp'));
 
    beforeEach( inject(function(_$compile_, _$rootScope_){
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    }));


});