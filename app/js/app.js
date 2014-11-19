// Include "angular-route"; "~1.3.2" in bower.json
// lots of other angular dependencies you can bring in when you
// need them. Makes the app leaner.
// initialize the app
// Declare Angular routes as a dependency so that Angular knows to pull in the
// code we installed with bower.
// Order doesn't matter too much. Realistically, this will all get separated into different files.
angular.module('StaffingUI', [
    'ngRoute'
]).run(function(UserFactory, TitleFactory, SkillFactory) {
  UserFactory.fetch();
  TitleFactory.fetch();
  SkillFactory.fetch();
});


// A run module will run this function right away as soon as the
// page loads. Here, we're going out and grabbing the titles.
// angular.module('StaffingUI').run(function(UserFactory, TitleFactory, SkillFactory) {
//   UserFactory.fetch();
//   TitleFactory.fetch();
//   SkillFactory.fetch();
// });
