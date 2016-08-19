angular.module('PrettyPrintTrello').controller('PreviewController', function PreviewController($scope, googleExtensionApiService) {
  "use strict";

  var labelsToColorMap = {
    "green": "#008000",
    "yellow": "#FFFF00",
    "orange": "#FFA500",
    "red": "#FF0000",
    "purple": "#800080",
    "blue": "#0000FF",
    "sky":"#87CEEB",
    "lime":"#32CD32",
    "pink":"#FFC0CB",
    "black":"#000000",
    "null":"#717171"
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

