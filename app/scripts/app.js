'use strict';

/**
 * @ngdoc overview
 * @name clusteringApp
 * @description
 * # clusteringApp
 *
 * Main module of the application.
 */
angular
  .module('clusteringApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMap',
    'ui.bootstrap',
    'bootstrap.fileField'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
