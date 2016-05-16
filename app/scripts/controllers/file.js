'use strict';

angular.module('clusteringApp')
	.controller('FileCtrl', function ($scope) {		

		$scope.showCities = function () {
			var cities = $scope.fileContent.split(/\r\n|\n/);
			if(cities[cities.length-1] === ""){
				cities.splice(-1,1);
			}					
			var matrix = createMatrix(cities.length);
			var n = matrix.length;
			var m = matrix[0].length;

			var origins = [];
			var destinations = [];
			for (var i = 0; i < 10; i++) {
				origins.push(cities[i]);
				destinations.push(cities[i]);
			}			
			console.log("Primer lote");
			getDistance(origins, destinations);	
			sleepFor(60*1000);		
			origins = [];
			destinations = [];
			for (var i = 10; i < 20; i++) {
				origins.push(cities[i]);
				destinations.push(cities[i]);
			}			
			console.log("Segundo lote");			
			getDistance(origins, destinations);
			/*for (var i = 0; i < n; i++) {
				for (var j = i + 1; j < m; j++) {
					matrix[i][j] = getDistance(cities[i], cities[j]);
				}
			}
			printMatrix(matrix);*/
		};	

		function sleepFor( sleepDuration ){
		    var now = new Date().getTime();
		    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
		}	

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

		function getCity(row) {
			return row.split(',')[0];
		}

		function getDistance(origins, destinations) {				
			
			var geocoder = new google.maps.Geocoder;
			var service = new google.maps.DistanceMatrixService;

			service.getDistanceMatrix({
				origins: origins,
				destinations: destinations,
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
			        			alert('Geocode was not successful due to: ' + status);
			      			}
			    		};
			  		};
			  		console.log(response);
			  		for (var i = 0; i < originList.length; i++) {
			    		var results = response.rows[i].elements;			    		
			    		geocoder.geocode({'address': originList[i]},
			        	showGeocodedAddressOnMap(false));

			    		for (var j = 0; j < results.length; j++) {
				      		geocoder.geocode({'address': destinationList[j]},
				        	showGeocodedAddressOnMap(true));				        	
				        	/*if(results[j].status === "ZERO_RESULTS"){				        		
				        		console.log("no se puede calcular distancia");
				        	}else{
				        		console.log(results[j]);				        		
				        	}*/				    				      
			    		}
			  		}
			  		sleepFor(60*1000);
				}
			});
		}
	});