// app_plotly.js
var app = angular.module('plotlyTest', ['plotly']);

app.controller('controller', function($scope, $http) {

	var temps=[];
	var humis=[];
	var ts=[];

	$http.get("/api/sensor")
	.success(function (res) {
		$scope.sensors = res;
		// when all data were acquired,
		
		for (i = 0; i < res.length; i++) { 
    		temps[i] = res[i].temperature;
    		humis[i] = res[i].humidity;
    		ts[i] = res[i].date;
		}
		
    });

    $scope.temp = temps;  // array
    $scope.humi = humis;  // array
	$scope.t = ts;  // aray

	var temp = {x: ts,
                y: temps,
                name:"Temp"};
    var humi = {x: ts,
                y: humis,
                name:"Humi"};

    $scope.data = [temp, humi];

    $scope.layout = {height: 500, width: 1200, title: 'Simple MEAM App: angular plotly graph from DHT22'};
    $scope.options = {showLink: true, displayLogo: false};
    /*$scope.movePoint = function() {
        $scope.data[0].y[4]++;
    }*/

    /*$scope.remove = function (id) {
		alert("Delete ? " + id);
		$http.delete('/api/sensor/' + id)
		.success(function(res) {
			$scope.sensors = res;
		})
	};*/
});
