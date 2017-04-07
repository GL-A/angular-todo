"use strict";

var app = angular.module("app", ["ui.router"]).config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'components/home.html',
    controller: 'homeCtrl'
  });
});
'use strict';

app.controller('homeCtrl', function ($scope) {
  $scope.test = 'Mauler';
});
//# sourceMappingURL=bundle.js.map
