describe("Filter 'initials'", function(){
  var filter;

  beforeEach(function() {
    angular.mock.module('TrelloPrettyPrint');
  });

  beforeEach(inject(function($filter) {
    filter = $filter('initials');
  }));

  it('should be defined', function() {
    expect(filter).toBeDefined();
  });

  it("should concat the field 'initials' field from a list of members", function() {
    var initials = filter([ { initials : 'AB'}, { initials : 'CD'} ]);

    expect(initials).toBe('AB/CD');
  });
});
