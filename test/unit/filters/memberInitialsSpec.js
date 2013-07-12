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

  it("should return an empty string if an array with invalid properties is given", function() {
    var initials = filter([ { ini : 'AB'}, { ini : 'CD'} ]);

    expect(initials).toBe('');
  });

  it("should return an empty string if an array with invalid properties is given", function() {
    var initials = filter([ { initials : ''}, { initials : 'CD'} ]);

    expect(initials).toBe('CD');
  });
});
