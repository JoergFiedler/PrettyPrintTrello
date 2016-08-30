angular.module('PrettyPrintTrello').controller('PreviewController', function PreviewController($scope, googleExtensionApiService) {
  "use strict";

  var labelsToColorMap = {
    "green": "#61BD4F",
    "yellow": "#F2D600",
    "orange": "#FFAB4A",
    "red": "#EB5A46",
    "purple": "#C377E0",
    "blue": "#0079BF",
    "sky":"#00C2E0",
    "lime":"#51E898",
    "pink":"#FF80CE",
    "black":"#000000",
    "null":"#C4C9CC"
  };

  function init() {
    $scope.$emit('tpp:action', { label: "Print'em All", 'event': 'tpp:print'});
  }

  function print(event, data) {
    googleExtensionApiService.print(angular.element('#tpp-print-frame').html());
  }

  function getCardColorByLabel(item) {
    var firstLabelColor = item.labels.length ? item.labels[0].color : 'null';
    return labelsToColorMap[firstLabelColor];
  }

  function getStoryStyle(item) {
    var color = $scope.cardColor ? $scope.cardColor : getCardColorByLabel(item);

    return {
      border: '10px solid ' + color
    }
  }

  $scope.init = init;
  $scope.getStoryStyle = getStoryStyle;

  $scope.$on('tpp:print', print);
});

