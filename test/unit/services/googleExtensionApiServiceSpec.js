describe("In googleExtensionApiService", function() {
  var service;

  beforeEach(function() {
    angular.mock.module('TrelloPrettyPrint');
  });

  beforeEach(inject(function(googleExtensionApiService) {
    service = googleExtensionApiService;
  }));

  describe('method openInNewTab', function() {

    it('should create a new tab via google extension api', function() {
      expect(window.chrome).toBeUndefined();
      window.chrome = { tabs: jasmine.createSpyObj('tabs', ['create']) };

      service.openInNewTab('/any-url');

      expect(chrome.tabs.create).toHaveBeenCalledWith({url: '/any-url'});
      window.chrome = undefined;
    });
  });

  describe('method getActiveTabUrl', function() {

  });
  it('should call google extension api to get the url of the current active tab of the active window', function() {
    var actualUrl = undefined,
      tabsWithUrl = [{ url: 'any-url'}];

    expect(window.chrome).toBeUndefined();
    window.chrome = { tabs: jasmine.createSpyObj('tabs', ['query']) };

    service.getActiveTabUrl(function(url) {
      actualUrl = url;
    });

    var callback = chrome.tabs.query.mostRecentCall.args[1];
    callback(tabsWithUrl);

    expect(chrome.tabs.query.mostRecentCall.args[0]).toEqual({ active: true, currentWindow: true });
    expect(actualUrl).toBe('any-url');
    window.chrome = undefined;
  });

});

