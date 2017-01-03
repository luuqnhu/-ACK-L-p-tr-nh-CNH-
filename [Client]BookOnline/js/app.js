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
		controller: 'detailController'
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
	.when('/search', {
		templateUrl: 'search.html',
		controller: 'searchController'
	})
	.otherwise({
        redirectTo: '/home/0'
    });
}]);

app.controller('aBc', function($scope, $route, $http, $templateCache){
	$scope.loadaccount = function () {
		var username = $.cookie("username");
		if (username) {
			$scope.checkdn = {username:username};
		}
	};
	$scope.loadaccount();

	$scope.dangnhap = function(){
		var username = $('#username').val();
		var password = $('#password').val();
		if (username == "abc" && password == "abc"){
			alert("Dang nhap thanh cong");
			$.cookie('username', 'abc');	
			window.location = "#/home";
		}
	}

	$scope.dangxuat = function(){
		alert("dang xuat");
		$.removeCookie('username');
	}

	$scope.dangky = function(){
		//dang ky
	}

	//serach theo ten sach
	$scope.findName = function(){
		var selectedType = $('#loaitimkiem').find("option:selected").val();
		var search_key = $('#search_key').val();
		//search theo ten
		if (selectedType == 1){
			$http.get('http://localhost:3000/books/name/' + search_key)
				.then(
					function(response){
						//success
						console.log(response.data);
						$scope.dsbook = response.data;
						//chuyen trang search result
						window.location = "#/search";
					},
					function(response){
						//error
						console.log("error");
					}
				);
		}
		//search theo tac gia
		if (selectedType == 2){
			$http.get('http://localhost:3000/books/author/' + search_key)
				.then(
					function(response){
						//success
						console.log(response.data);
						$scope.dsbook = response.data;
						//chuyen trang search result
						window.location = "#/search";
					},
					function(response){
						//error
						console.log("error");
					}
				);
		}
		//search theo gia
		if (selectedType == 3){
			$http.get('http://localhost:3000/books/price/' + search_key)
				.then(
					function(response){
						//success
						console.log(response.data);
						$scope.dsbook = response.data;
						//chuyen trang search result
						window.location = "#/search";
					},
					function(response){
						//error
						console.log("error");
					}
				);
		}
		//search theo ngon ngu
		if (selectedType == 4){
			$http.get('http://localhost:3000/books/language/' + search_key)
				.then(
					function(response){
						//success
						console.log(response.data);
						$scope.dsbook = response.data;
						//chuyen trang search result
						window.location = "#/search";
					},
					function(response){
						//error
						console.log("error");
					}
				);
		}
		alert(search_key);
		// alert("new the loai a");
		// var O = {
		// 	TenTheLoai: "name"
		// }
		// //cap nhat vao bang MaDatCho|Ten|HoChieu
		// $http.post('http://localhost:3000/gernes/new', O)
		// 	.then(function(response){
		// });
		    
		//search................
	}
});

app.controller('homeController', function($scope, $http, $routeParams, $rootScope){
	//load ds the loai
	$http.get('http://localhost:3000/gernes/all')
		.then(
			function(response){
				//success
				console.log(response.data);
				$scope.types = response.data;
			}, 
			function(response){
				//error
				console.log("error");
			}
		);

	//chuyen trang login
	$scope.login = function(){
		window.location = "#/login";
	}

	//chuyen register
	$scope.register = function(){
		window.location = "#/register";
	}

	//load ds mac dinh - moi nhat
	if ($routeParams.type == 0){
		var ds = [{'id': '1', 'name': 'Trang sach moi nhat', 'author': 'nakun', 'cost': '10000'}, 
		{'id': '2', 'name': 'Trang sach moi nhat', 'author': 'nakun', 'cost': '10000'}];
		$scope.dsbook = ds;
	} else{
		//load sach theo the loai
		$http.get('http://localhost:3000/books/gerne/' + $routeParams.type)
			.then(
				function(response){
					//success
					console.log(response.data);
					$scope.dsbook = response.data;
			},
			function(response){
				//error
				console.log("error");
			}
		);
	}
	
	
	//chi tiet sach
	$scope.chitietsach = function(e){
		//lay cac thông so sach sa chon -> cookie
		var itensach = $(e.currentTarget).attr("itensach");
		var itacgia = $(e.currentTarget).attr("itacgia");
		var igia = $(e.currentTarget).attr("igia");
		var ingonngu = $(e.currentTarget).attr("ingonngu");
		var isotrang = $(e.currentTarget).attr("isotrang");
		var inxb = $(e.currentTarget).attr("inxb");
		$.cookie('ctensach', itensach);
		$.cookie('ctacgia', itacgia);
		$.cookie('cgia', igia);
		$.cookie('cngonngu', ingonngu);
		$.cookie('csotrang', isotrang);
		$.cookie('cnxb', inxb);
		//chuyen sang trang chi tiet
		window.location = "#/detail";
	}

	//page
	// var mpage = 1;
	
	// $scope.nextpage = function($page){
	// 	//page max
	// 	var pagemax = 2;

	// 	if ($page == pagemax){
	// 		mpage = pagemax;
	// 	}
	// 	if ($page < pagemax){
	// 		mpage = parseInt($page) + 1;
	// 	}
	// 	$.cookie("page", mpage);
	// 	$scope.page = $.cookie("page");
	// 	//show ds sach......................
	// 	var ds = [{'id': '1', 'name': 'Paging next', 'author': 'nakun', 'cost': '10000'}, 
	// 			{'id': '2', 'name': 'Paging next', 'author': 'nakun', 'cost': '10000'}];
	// 	$scope.dsbook = ds;
	// }

	// $scope.previouspage = function($page){
	// 	if ($page == 1){
	// 		mpage = 1;
	// 	}
	// 	if ($page > 1){
	// 		mpage = parseInt($page) - 1;
	// 	}
	// 	$.cookie("page", mpage);
	// 	$scope.page = $.cookie("page");
	// 	//show ds sach
	// 	var ds = [{'id': '1', 'name': 'Paging previous', 'author': 'nakun', 'cost': '10000'}, 
	// 			{'id': '2', 'name': 'Paging previous', 'author': 'nakun', 'cost': '10000'}];
	// 	$scope.dsbook = ds;
	// }

	// //neu co cookie page thi show theo page
	// //neu khong co cookie theo page thi show trang 1
	// if ($.cookie("page")){
	// 	$scope.page = $.cookie("page");
	// 	//show ds the cookie
	// 	//.................................
	// 	if ($routeParams.type == 0){
	// 		var ds = [{'id': '1', 'name': 'Trang 0', 'author': 'nakun', 'cost': '10000'}, 
	// 			{'id': '2', 'name': 'Trang 0', 'author': 'nakun', 'cost': '10000'}];
	// 		$scope.dsbook = ds;
	// 	}
	// 	if ($routeParams.type == 1){
	// 		var ds = [{'id': '1', 'name': 'Paging init 1', 'author': 'nakun', 'cost': '10000'}, 
	// 			{'id': '2', 'name': 'Paging init 1', 'author': 'nakun', 'cost': '10000'}];
	// 		$scope.dsbook = ds;
	// 	}
	// 	if ($routeParams.type == 2){
	// 		var ds = [{'id': '1', 'name': 'Paging init 2', 'author': 'nakun', 'cost': '10000'}, 
	// 			{'id': '2', 'name': 'Paging init 2', 'author': 'nakun', 'cost': '10000'}];
	// 		$scope.dsbook = ds;
	// 	}
	// }else{
	// 	$.cookie("page", mpage);
	// 	$scope.page = $.cookie("page");
	// }
	
});

app.controller('loginController', function($scope){
	
});

app.controller('searchController', function($scope, $http){
	//load menu loai
	$http.get('http://localhost:3000/gernes/all')
		.then(
			function(response){
				//success
				console.log(response.data);
				$scope.types = response.data;
			}, 
			function(response){
				//error
				console.log("error");
			}
		);
});

app.controller('detailController', function($scope, $http){
	//load menu loai
	$http.get('http://localhost:3000/gernes/all')
		.then(
			function(response){
				//success
				console.log(response.data);
				$scope.types = response.data;
			}, 
			function(response){
				//error
				console.log("error");
			}
		);

	//load du lieu sach 
	$scope.tensach = $.cookie('ctensach');
	$scope.tacgia = $.cookie('ctacgia');
	$scope.gia = $.cookie('cgia');
	$scope.ngonngu = $.cookie('cngonngu');
	$scope.sotrang = $.cookie('csotrang');
	$scope.nxb = $.cookie('cnxb');
	//load binh luan cua sach
	var dsbinhluan = [{'id': '1', 'content': 'Sach nay hay lam.....'},
					{'id': '2', 'content': 'Uhm'},
					{'id': '3', 'content': 'Tui hong pit nua...'}];
	$scope.dsbinhluan = dsbinhluan;
	//event button binh luan
	$scope.binhluan = function(){
		//lay du lieu tu input
		var ndbinhluan = $('#ndbinhluan').val();
		alert(ndbinhluan);
		//thao tac binh luan
		//+dua vao csdl
		//+hien thi
		$('#listbinhluan').html(
			'<div class="row comment">' +
				'<span>Tên người bình luận</span>' +
				'<p>' + ndbinhluan +'</p>' + 
			'</div>' + $('#listbinhluan').html()
		);
	};

	//them vao gio hang

});
