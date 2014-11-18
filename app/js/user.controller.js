angular.module('StaffingUI').controller('UserCtrl', function($scope, $http, UserFactory, TitleFactory) {
  'use strict';

  // $http.get('http://localhost:3000/users').success(function(response) {
  //   $scope.users = response;
  // });

  $scope.users = UserFactory.users;
  $scope.titles = TitleFactory.titles;


  $scope.upsertUsers = function(user) {
    var params = {
      user: user
      // user: {
      //   first_name: user.first_name,
      //   last_name: user.last_name,
      //   title_id: user.title_id
      // }
    };

    if (user.id) {
      $http.put('http://localhost:3000/users/' + user.id, params).success(function(response) {
        // $scope.users = response;
        UserFactory.fetch();
        // $scope.users = UserFactory.users;
      });
    } else {
        $http.post('http://localhost:3000/users', params).success(function(response) {
          $scope.users.push(response)
          // $scope.users = UserFactory.users;
          UserFactory.fetch();
          // $scope.users = UserFactory.users;
        });
    }

    $scope.user = {};

  };

  $scope.editUser = function(user) {
    $scope.user = user;
  };

  $scope.deleteUser = function(user) {
    $http.delete('http://localhost:3000/users/' + user.id).success(function(response) {
        var index = $scope.users.indexOf(user);
        $scope.users.splice(index, 1);
      })
    };
});
