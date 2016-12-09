var myApp = angular.module('myApp', ['ngRoute']);
myApp.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'home.html'
	})
	.when('/login', {
		templateUrl: 'login.html'
	})
	.when('/register', {
		templateUrl: 'register.html'
	})
	.when('/detail', {
		templateUrl: 'detail.html'
	})
	.when('/cart', {
		templateUrl: 'cart.html'
	})
	.when('/add_cart_success', {
		templateUrl: 'add_cart_success.html'
	})
	.when('/thank', {
		templateUrl: 'thank.html'
	});
});

myApp.controller('bookonline', function($scope){
	$scope.abc = function(){
		alert("abc");
		window.location = "#/login";
	}
});