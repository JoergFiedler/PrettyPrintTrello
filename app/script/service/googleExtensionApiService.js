angular.module('TrelloPrettyPrint').service('googleExtensionApiService', function googleExtensionApiService($window, $location) {
  "use strict";

  function openInNewTab(url) {
    chrome.tabs.create({
      url: $location.path() + url
    });
  }

  function createLinkToExtension() {
    return $location.protocol() + "://" + $location.host();
  }

  function print(html) {
    var styleSheetUrl, window;

    styleSheetUrl = createLinkToExtension() + "/stylesheets/main.css";
    window = $window.open("about:blank");
    window.document.write("<html><head><link href='" + styleSheetUrl + "' rel='stylesheet'></head><body>");
    window.document.write(html);
    window.document.write('</body></html>');
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
    print:           print
  }
});
