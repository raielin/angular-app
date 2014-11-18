// Remember to pass in TitleFactory as a parameter for controllers where we need to access it.
angular.module('StaffingUI').controller('TitleCtrl', function($scope, $http, TitleFactory) {
  'use strict';

  $scope.titles = TitleFactory.titles;

  // $http.get('http://localhost:3000/titles').success(function(response) {
  //   $scope.titles = response;
  // });

  $scope.upsertTitles = function(title) {
    var params = {
      title: title
    };

    if (title.id) {
      $http.put('http://localhost:3000/titles/' + title.id, params).success(function(response) {
        // $scope.title = response;
        TitleFactory.fetch();
        // Don't need this.
        // $scope.titles = TitleFactory.titles;
      });
    } else {
        $http.post('http://localhost:3000/titles', params).success(function(response) {
          // $scope.titles.push(response)
          TitleFactory.fetch();
          // Don't need this.
          // $scope.titles = TitleFactory.titles;
        });
    }

    $scope.title = {};

  };

  $scope.editTitle = function(title) {
    $scope.title = title;
  };

  $scope.deleteTitle = function(title) {
    $http.delete('http://localhost:3000/titles/' + title.id).success(function(response) {
        var index = $scope.titles.indexOf(title);
        $scope.titles.splice(index, 1);
      })
    };
});
