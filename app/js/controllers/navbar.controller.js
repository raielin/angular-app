// .controller in the filename is a convention that's used by Yeoman
// good practice, but not necessary.

// Can be organized by function, i.e. login, nav, etc.
// , or by type, i.e. controller, factory, etc.

// Angular will look for the module. So as long as the module is defined,
// Angular will know to associate it.
angular.module('StaffingUI').controller('NavbarCtrl', function($scope, $location) {
    'use strict';

    $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
    };
});
