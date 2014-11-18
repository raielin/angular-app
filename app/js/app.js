// Include "angular-route"; "~1.3.2" in bower.json
// lots of other angular dependencies you can bring in when you
// need them. Makes the app leaner.
// initialize the app
// Declare Angular routes as a dependency so that Angular knows to pull in the
// code we installed with bower.
// Order doesn't matter too much. Realistically, this will all get separated into different files.
angular.module('StaffingUI', [
    'ngRoute'
]);

// A run module will run this function right away as soon as the
// page loads. Here, we're going out and grabbing the titles.
angular.module('StaffingUI').run(function(UserFactory, TitleFactory, SkillFactory) {
  UserFactory.fetch();
  TitleFactory.fetch();
  SkillFactory.fetch();
});

angular.module('StaffingUI').config(function($routeProvider) {
    'use strict';

    // Similar to backbone router. Angular routes gives us $routeProvider.
    // .when maps up to routes.
    // Don't need to put in the hash - Angular assumes that, can
    // see it in the browser address bar. Routing starts after the hash.
    // Templates are JUST HTML files. Go to HTML file - look for ng-view.
    $routeProvider
        .when('/', {
          templateUrl: 'templates/home.html'
        })
        .when('/about', {
          templateUrl: 'templates/about.html'
        })
        .when('/contact', {
          templateUrl: 'templates/contact.html'
        })
        .when('/users', {
          templateUrl: 'templates/users.html'
        })
        .when('/titles', {
          templateUrl: 'templates/titles.html'
        })
        .when('/skills', {
          templateUrl: 'templates/skills.html'
        })
        .otherwise({
          redirectTo: '/'
        });
});

// Factory allows us to list out our titles in the dropdown
// Unless you have a good reason to use a service, it's better to use a Factory
// We use a factory for sharing data or functionality between controllers.
// Allows us to keep our logic out of our controllers.

angular.module('StaffingUI').factory('UserFactory', function($http) {
  var users = [];

  var fetch = function() {
    $http.get('http://localhost:3000/users').success(function(response) {
      angular.copy(response, users);
    });
  };

  return {
    users: users,
    fetch: fetch
  };
});

angular.module('StaffingUI').factory('TitleFactory', function($http) {
  var titles = [];

  var fetch = function() {
    $http.get('http://localhost:3000/titles').success(function(response) {
      // use angular.copy() to retain the original array which the controllers
      // are bound to. tasks = response will overwrite the array with a new one
      // and the controllers loose the reference. could also do tasks.length = 0,
      // then push in the new items
      angular.copy(response, titles);
    });
  };

  return {
    titles: titles,
    fetch: fetch
  };
});


angular.module('StaffingUI').factory('SkillFactory', function($http) {
  var skills = [];

  var fetch = function() {
    $http.get('http://localhost:3000/skills').success(function(response) {
      angular.copy(response, skills);
    });
  };

  return {
    skills: skills,
    fetch: fetch
  };
});

angular.module('StaffingUI').controller('UsersCtrl', function($scope, $http, UserFactory, TitleFactory) {
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

// Remember to pass in TitleFactory as a parameter for controllers where we need to access it.
angular.module('StaffingUI').controller('TitlesCtrl', function($scope, $http, TitleFactory) {
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

angular.module('StaffingUI').controller('SkillsCtrl', function($scope, $http, SkillFactory) {
  'use strict';

  $scope.skills = SkillFactory.skills;

  $scope.upsertSkills = function(skill) {
    var params = {
      skill: skill
    };

    if (skill.id) {
      $http.put('http://localhost:3000/skills/' + skill.id, params).success(function(response) {
        SkillFactory.fetch();
      });
    } else {
        $http.post('http://localhost:3000/skills', params).success(function(response) {
          SkillFactory.fetch();
        });
    }

    $scope.skill = {};

  };

  $scope.editSkill = function(skill) {
    $scope.skill = skill;
  };

  $scope.deleteSkill = function(skill) {
    $http.delete('http://localhost:3000/skills/' + skill.id).success(function(response) {
        var index = $scope.skills.indexOf(skill);
        $scope.skills.splice(index, 1);
      })
    };
});
