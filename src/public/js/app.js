// app.js
var app = angular.module("DHTApp", []);

app.controller('DHTController', function($scope, $http) {
	$scope.hello = "Hello Angular Apps : DHT22!";
	
	$http.get("/api/sensor")
	.success(function (res) {
		$scope.sensors = res;
	});

	$scope.remove = function (id) {
		alert("Delete ? " + id);
		$http.delete('/api/sensor/' + id)
		.success(function(res) {
			$scope.sensors = res;
		})
	};

});