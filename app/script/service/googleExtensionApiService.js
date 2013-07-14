angular.module('TrelloPrettyPrint').service('googleExtensionApiService', function googleExtensionApiService($window, $location) {
  "use strict";

  function openInNewTab(url) {
    chrome.tabs.create({
      url: $location.path() + url
    });
  }

  function print(html) {
    var window = $window.open("about:blank");
    window.document.write(html);
    window.document.close();
    window.print();
  }

  function getActiveTabUrl(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function tabsFound(tabs) {
      callback(tabs[0].url);
    });
  }

  return {
    openInNewTab:    openInNewTab,
    getActiveTabUrl: getActiveTabUrl,
    print: print
  }
});
