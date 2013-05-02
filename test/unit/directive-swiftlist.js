describe('Unit testing great quotes', function() {
    var $compile;
    var $rootScope;
 
    // Load the myApp module, which contains the directive
    beforeEach( module('myApp'));
 
    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach( inject(function(_$compile_, _$rootScope_){
      // The injector unwraps the underscores (_) from around the parameter names when matching
      console.log("aaaa" )
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