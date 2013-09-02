angular.module('PrettyPrintTrello').service('googleExtensionApiService', function googleExtensionApiService($window, $location) {
  "use strict";

  function createLinkToExtension() {
    return $location.protocol() + "://" + $location.host();
  }

  function openInNewTab(url) {
    console.log('Open url:', url);
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
    $window.setTimeout(function () {
      callback('https://trello.com/b/E0CPmr4s/i18n');
    }, 1000);
  }

  return {
    openInNewTab:    openInNewTab,
    getActiveTabUrl: getActiveTabUrl,
    print:           print
  }
});
