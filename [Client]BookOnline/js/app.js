var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/home/:type', {
		templateUrl: 'home.html',
		controller: 'homeController'
	})
	.when('/login', {
		templateUrl: 'login.html',
		controller: 'loginController'
	})
	.when('/register', {
		templateUrl: 'register.html',
		controller: 'registerController'
	})
	.when('/detail', {
		templateUrl: 'detail.html',
		//controller: 'detailController'
	})
	.when('/cart', {
		templateUrl: 'cart.html',
		controller: 'cartController'
	})
	.when('/add_cart_success', {
		templateUrl: 'add_cart_success.html',
		controller: 'add_cart_successController'
	})
	.when('/thank', {
		templateUrl: 'thank.html',
		controller: 'thankController'
	})
	.otherwise({
        redirectTo: '/home/0'
    });
}]);

app.controller('homeController', function($scope, $routeParams){
	//load ds the loai
	var dstype = [{'id': '1', 'name': 'Thiếu nhi'}, 
				{'id': '2', 'name': 'Văn học'}, 
				{'id': '3', 'name': 'Lịch sử'}, 
				{'id': '4', 'name': 'Khoa học'}];
	$scope.types = dstype;
	//get danh sach sach - neu type = 0 -> ds book new - neu # 0 -> ds theo type
	if ($routeParams.type == 1){
		var ds = [{'id': '1', 'name': 'The loai 1', 'author': 'nakun', 'cost': '10000'}, 
				{'id': '2', 'name': 'The loai 1', 'author': 'nakun', 'cost': '10000'}];
		$scope.dsbook = ds;
	}

	$scope.maxpage = 1;
	//page
	$.cookie("page", 1);

	//login
	$scope.login = function(){
		window.location = "#/login";
	}

	//register
	$scope.register = function(){
		window.location = "#/register";
	}

	//search
	$scope.findName = function(){
		//tim kiem theo ten
		var search_key = $('#search_key').val();
		alert(search_key);
		//search................
	}

	$scope.nextpage = function($page){
		//page max
		var $pagemax = 2;

		if ($page == $pagemax){
			$.cookie("page", $pagemax);
		}
		if ($page < $pagemax){
			$.cookie("page", 2);
		}
		$scope.page = $.cookie("page");
	}

	$scope.previouspage = function($page){
		if ($page == 1){
			$.cookie("page", 1);
		}
		if ($page > 1){
			$.cookie("page", $page - 1);
		}
		$scope.page = $.cookie("page");
	}

	$scope.page = $.cookie("page");
});

app.controller('loginController', function($scope){

});
