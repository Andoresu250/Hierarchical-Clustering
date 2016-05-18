'use strict';

angular.module('clusteringApp')
	.controller('FileCtrl', function ($scope, $uibModal) {	

		$scope.cities = []; 
		
		$scope.showCities = function () {
			var cities = [];
			cities = $scope.fileContent.split(/\r\n|\n/);			
			if(cities[cities.length-1] === ""){
				cities.splice(-1,1);
			}		
			for (var i = 0; i < cities.length; i++) {
				if(cities[i].indexOf("�") > -1){
					cities[i] = cities[i].replaceAt(cities[i].indexOf("�"), "ñ");
				}
				console.log(cities[i]);
			}

			$scope.cities = cities;
											
			if($scope.cities.length > 14){
				//Message
				$scope.cities = [];
				console.log("Muchas ciudades");
				openModal();

			}else{
				$scope.matrix = createMatrix($scope.cities.length);
				$scope.n = $scope.matrix.length;
				$scope.m = $scope.matrix[0].length;
				for (var i = 0; i < $scope.n; i++) {											
					for (var j = i + 1; j < $scope.m; j++) {
						var origin = {"name": $scope.cities[i],"i":i, "j":j};
						var destination = {"name": $scope.cities[j],"i":i, "j":j};
						getDistance(origin, destination);
					}
				}			
			}			
		};	

		function createMatrix(n){
			var matrix = [];
			for(var i = 0; i < n; i++) {
			    matrix[i] = new Array(n);
			}
			return initMatrix(matrix);
		}

		function initMatrix(matrix){
			for(var i = 0; i < matrix.length; i++) {
			    matrix[i] = [];
			    for(var j = 0; j < matrix.length; j++) {
			    	if(i !== j){
			    		matrix[i][j] = 0;
			    	}else{
			    		matrix[i][j] = undefined;
			    	}			        
			    }
			}
			return matrix;
		}

		function printMatrix(matrix) {
			var n = matrix.length;
			var m = matrix[0].length;
			for (var i = 0; i < n; i++) {
				var s = "| ";
				for (var j = 0; j < m; j++) {
					s = s + matrix[i][j] + " | ";					
				}
				console.log(s);
			}
		}

		function getDistance(origin, destination) {				
			
			var geocoder = new google.maps.Geocoder;
			var service = new google.maps.DistanceMatrixService;

			service.getDistanceMatrix({
				origins: [origin.name],
				destinations: [destination.name],
				travelMode: google.maps.TravelMode.DRIVING,
				unitSystem: google.maps.UnitSystem.METRIC,
				avoidHighways: false,
				avoidTolls: false
			}, function(response, status) {
				if (status !== google.maps.DistanceMatrixStatus.OK) {
			  		alert('Error was: ' + status);
				} else {
			  		var originList = response.originAddresses;
			  		var destinationList = response.destinationAddresses;			  			  

			  		var showGeocodedAddressOnMap = function(asDestination) {			    
			    		return function(results, status) {
			      			if (status === google.maps.GeocoderStatus.OK) {			        
			        
			       		    } else {
			        			/*console.log('Geocode was not successful due to: ' + status);*/
			      			}
			    		};
			  		};				  		  		
			  		for (var i = 0; i < originList.length; i++) {
			    		var results = response.rows[i].elements;			    		
			    		geocoder.geocode({'address': originList[i]},
			        	showGeocodedAddressOnMap(false));
			    		for (var j = 0; j < results.length; j++) {
				      		geocoder.geocode({'address': destinationList[j]},
				        	showGeocodedAddressOnMap(true));					        					        					        	
				        	if(results[j].status === "ZERO_RESULTS"){				        						        		
				        		$scope.matrix[origin.i][origin.j] = undefined;
				        		$scope.matrix[origin.j][origin.i] = undefined;
				        	}else{
				        		$scope.matrix[origin.i][origin.j] = results[j].distance.value;				        				        		
				        		$scope.matrix[origin.j][origin.i] = results[j].distance.value;				        				        		
				        	}
			    		}
			  		}		
			  		if((origin.i === $scope.matrix.length - 2) && (origin.j === $scope.matrix.length - 1)){
		  				printMatrix($scope.matrix);
			  		}	  		
				}
			});
		}	

		String.prototype.replaceAt=function(index, character) {
		    return this.substr(0, index) + character + this.substr(index+character.length);
		}

		function openModal(size) {

			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: 'views/templates/myModalContent.html',
				controller: 'ModalInstanceCtrl',
				size: size
			});

			modalInstance.result.then(function (selectedItem) {
				$scope.selected = selectedItem;
			}, function () {
				
			});
		}

		$scope.toggleAnimation = function () {
			$scope.animationsEnabled = !$scope.animationsEnabled;
		};	
		
		
	});