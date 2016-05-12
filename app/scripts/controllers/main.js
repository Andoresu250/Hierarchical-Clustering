'use strict';

/**
 * @ngdoc function
 * @name clusteringApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clusteringApp
 */
angular.module('clusteringApp')
  .controller('MainCtrl', function (NgMap) {
  	this.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyA9ZYFcFW8V_d319G7y9e8NwlP2BuS9qt4";
    NgMap.getMap().then(function(map) {
    	console.log(map.getCenter());
    	console.log('markers', map.markers);
    	console.log('shapes', map.shapes);
  	});
  });
