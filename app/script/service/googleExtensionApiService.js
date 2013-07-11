angular.module('TrelloPrettyPrint').service('googleExtensionApiService', function googleExtensionApiService($location) {
  "use strict";

  function openInNewTab(url) {
    chrome.tabs.create({
      url: $location.path() + url
    });
  }

  function getActiveTabUrl(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function tabsFound(tabs) {
      callback(tabs[0].url);
    });
  }

  return {
    openInNewTab: openInNewTab,
    getActiveTabUrl: getActiveTabUrl
  }
});
