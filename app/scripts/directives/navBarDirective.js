'use strict';

angular.module('clusteringApp')
.directive('navBar', function(){    
    return {
      restrict: 'E',
      templateUrl: '/views/templates/nav-bar.html',
      controller: 'FileCtrl',
      controllerAs: 'navBar'
    };      
  });