var app = angular.module("app", ["ui.router"])
  .config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'components/home.html',
      controller: 'homeCtrl'
    })
  });
