// Include "angular-route"; "~1.3.2" in bower.json
// lots of other angular dependencies you can bring in when you
// need them. Makes the app leaner.
// initialize the app
// Declare Angular routes as a dependency so that Angular knows to pull in the
// code we installed with bower.
angular.module('Demo', [
    'ngRoute'
]);

angular.module('Demo').config(function($routeProvider) {
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
        .otherwise({
            redirectTo: '/'
        });
});

angular.module('Demo').controller('NavbarCtrl', function($scope, $location) {
    'use strict';

    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };
});

angular.module('Demo').controller('TitlesCtrl', function($scope, $http) {
  'use strict';

  $http.get('http://localhost:3000/titles').success(function(response) {
    $scope.titles = response;
  });

  $scope.createAndUpdateTitles = function(title) {
    var params = {
      title: title
    };

    if (title.id) {
      $http.put('http://localhost:3000/titles/' + title.id, params).success(function(response) {
        $scope.title = response;
      });
    } else {
        $http.post('http://localhost:3000/titles', params).success(function(response) {
          $scope.titles.push(response)
        });
    }

    $scope.title = {};

  };

  $scope.upsertTitle = function(title) {
    $scope.title = title;
  };

  $scope.deleteTitle = function(title) {
    $http.delete('http://localhost:3000/titles/' + title.id).success(function(response) {
        var index = $scope.titles.indexOf(title);
        $scope.titles.splice(index, 1);
      })
    };
});

angular.module('Demo').controller('UsersCtrl', function($scope, $http) {
  'use strict';

  $http.get('http://localhost:3000/users').success(function(response) {
    $scope.users = response;
  });

  $scope.createAndUpdateUsers = function(user) {
    var params = {
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        title: {
            name: user.title.name
        }
      }
    };

    if (user.id) {
      $http.put('http://localhost:3000/users/' + user.id, params).success(function(response) {
        debugger
        $scope.user = response;
      });
    } else {
        $http.post('http://localhost:3000/users', params).success(function(response) {
          $scope.users.push(response)
        });
    }

    $scope.user = {};

  };

  $scope.upsertUser = function(user) {
    $scope.user = user;
  };

  $scope.deleteUser = function(user) {
    $http.delete('http://localhost:3000/users/' + user.id).success(function(response) {
        var index = $scope.users.indexOf(user);
        $scope.users.splice(index, 1);
      })
    };
});
