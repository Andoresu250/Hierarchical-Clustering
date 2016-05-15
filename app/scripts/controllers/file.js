'use strict';

angular.module('clusteringApp')
	.controller('FileCtrl', function ($scope) {
		$scope.showCities = function () {
			var cities = $scope.fileContent.split(/\r\n|\n/);
			console.log(cities);			
		}
	});