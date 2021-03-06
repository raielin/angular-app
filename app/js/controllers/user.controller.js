angular.module('StaffingUI').controller('UserCtrl', function($scope, $http, $q, ServerUrl, UserFactory, TitleFactory, SkillFactory) {
  'use strict';

  // $http.get(ServerUrl + 'users').success(function(response) {
  //   $scope.users = response;
  // });

  $scope.users = UserFactory.users;
  $scope.titles = TitleFactory.titles;
  $scope.skills = SkillFactory.skills;

  // Looks through all the skills and comparing current state to whether user has that skill yet
  // If not, we will make a put request to update the skill
  // If it was checked and is no longer checked, it will make a delete request.
  var updateSkills = function(user_id) {
    var promises = [];

    _.forEach($scope.skills, function(item) {
        var isChecked = item.checked;
        var wasChecked = typeof _.find($scope.user.skills, {id: item.id}) !== 'undefined';

        // add skill
        if (isChecked && !wasChecked) {
          promises.push($http.put(ServerUrl + 'users/' + user_id + '/skills/' + item.id));
        }

        // remove skill
        if (!isChecked && wasChecked) {
          promises.push($http.delete(ServerUrl + 'users/' + user_id + '/skills/' + item.id));
        //   debugger;
        //   for (var i = 0; i < $scope.user.skills.length; i++)
        //     if ($scope.user.skills[i].id === item.id)  {
        //       $scope.user.skills.splice(i, 1);
        //       return $scope.user.skills;
        //     }
        //   promises.push($http.get(ServerUrl + 'users/' + user_id + '/skills'))
        // }
        }
    });

    return promises;
  };

  var clearForm = function() {
    $scope.user = {};

    UserFactory.fetch();
    SkillFactory.resetChecked();
  };


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
      $http.put(ServerUrl + 'users/' + user.id, params).success(function(response) {
        // $scope.users = response;
        // UserFactory.fetch();
        $q.all(updateSkills(user.id)).then(function() {
          clearForm();
        });
      });
    } else {
        $http.post(ServerUrl + 'users', params).success(function(response) {
          // $scope.users.push(response)
          // UserFactory.fetch();
          $q.all(updateSkills(response.id)).then(function() {
            clearForm();
          });
        });
    }
  };

  $scope.editUser = function(user) {
    $scope.user = user;

    // update skills based on this user
    _.forEach($scope.skills, function(item) {
      if ($scope.userHasSkill(item)) {
        item.checked = true;
      }
    });
  };

  $scope.deleteUser = function(user) {
    $http.delete(ServerUrl + 'users/' + user.id).success(function(response) {
        var index = $scope.users.indexOf(user);
        $scope.users.splice(index, 1);
      })

    clearForm();

  };

  $scope.userHasSkill = function(skill) {
    var found = [];
    // Includes logic that makes sure we have a user and that user has skills
    // Assuming that passes, we use a filter function to go through all of the user's skills
    // And find ones that match up
    // Filter returns a new array.
    if (typeof $scope.user !== 'undefined' && typeof $scope.user.skills !== 'undefined') {
      found = $scope.user.skills.filter(function(item) {
          return item.id === skill.id;
      });
    }
    // If array is longer than 0 then user must have a skill
    // If returns true, then ng-checked in our HTML will check the box.
    return found.length > 0;
  };

});
