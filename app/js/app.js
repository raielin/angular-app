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
