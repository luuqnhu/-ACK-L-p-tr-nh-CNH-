var app = angular.module('myApp', ['ngRoute']);

window.fbAsyncInit = function() {
    FB.init({
      appId      : '1522212551126726',
      xfbml      : true,
      version    : 'v2.8',
      status	 : true
    });
    FB.AppEvents.logPageView();
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

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
	.when('/admin', {
		templateUrl: 'admin.html',
		controller: 'adminController'
	})
	.otherwise({
        redirectTo: '/home/0'
    });
}]);
var cart = [];
app.controller('aBc', function($scope, $route, $http, $templateCache){
	$scope.loadaccount = function () {
		var username = null;
		if ($.cookie('usernamefb')){
			username = $.cookie('usernamefb');
			$.cookie('username', username);
		}else if ($.cookie('usernamedn')){
			username = $.cookie('usernamedn');
			$.cookie('username', username);
		}
		if (username != null) {
			$scope.checkdn = {username:username};
		}
	};

	// $scope.loadaccount = function(){
	// 	var token = $.cookie("token");
	// 	if (token){
	// 		$http.get('http://localhost:3000/users/api/get/detail/admin').then(
	// 			function(response){
	// 				//success
	// 				console.log("tc");
	// 				console.log(response);
	// 				//$scope.checkdn = {username:response.Username};
	// 			}, 
	// 			function(response){
	// 				//error
	// 				console.log("error");
	// 			}
	// 		);
	// 	}
	// }
	$scope.loadaccount();

	//chuyen trang login
	$scope.login = function(){
		window.location = "#/login";
		// FB.login(function(response) {
		// 	if (response.authResponse) {
		// 		console.log('Welcome!  Fetching your information.... ');
		// 		FB.api('/me', function(response) {
		// 			console.log('Good to see you, ' + response.name + '.');
		// 			$.cookie('username', response.name);
		// 			var accessToken = FB.getAuthResponse();
		// 			console.log(accessToken);
		// 			window.location.reload(true);
		// 		});
		// 	} else {
		// 		console.log('User cancelled login or did not fully authorize.');
		// 	}
		// });
	}

	$scope.dangxuat = function(){
		alert("Đăng xuất");
		$.removeCookie('usernamefb');
		$.removeCookie('usernamedn');
		$.removeCookie('useridfb');
		$.removeCookie('useriddn')
		$.removeCookie('username');
		$.removeCookie('token');
		window.location.reload(true);
	}

	//serach theo ten sach
	$scope.findName = function(){
		var selectedType = $('#loaitimkiem').find("option:selected").val();
		var search_key = $('#search_key').val();
		//search theo ten
		if (selectedType == 1){
			$http.get('http://localhost:3000/books/get/name/' + search_key)
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
		// alert("new the loai a")
		    
		//search................
	}
});
app.controller('adminController', function($scope, $route, $http, $templateCache){
	//load ds the loai
	$http.get('http://localhost:3000/gernes/get/all')
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
	//them sach
	$scope.adminthemsach = function(){
		//get data
		var newbook = {
			TenSach: $('#tab1tensach').val(),
			SoLuongConLai: $('#tab1soluong').val(),
			TacGia: $('#tab1tacgia').val(),
			Gia: $('#tab1gia').val(),
			NgonNgu: $('#tab1ngonngu').val(),
			SoTrang: $('#tab1sotrang').val(),
			AnhBia: $('#tab1anhbia').val(),
			NXB: $('#tab1nxb').val(),
			IdTheLoai: $('#tab1theloai').val()
		}
		//goi api
		if ($.cookie('token')){
			$http.post('http://localhost:3000/books/api/new?token=' + $.cookie('token'), newbook).then(
				function(response){
					//success
					if (response.data.success == false){
						alert('Thao tác thất bại');
					}else{
						alert('Thêm sách thành công!');
					}
				});
		}else{
			alert('Vui lòng đăng nhập');
		}
	}
	$scope.admincapnhatsach = function(){
		//get data
		var book = {
			IdSach: $('#tab2idsach').val(),
			TenSach: $('#tab2tensach').val(),
			SoLuongConLai: $('#tab2soluong').val(),
			TacGia: $('#tab2tacgia').val(),
			Gia: $('#tab2gia').val(),
			NgonNgu: $('#tab2ngonngu').val(),
			SoTrang: $('#tab2sotrang').val(),
			AnhBia: $('#tab2anhbia').val(),
			NXB: $('#tab2nxb').val(),
			IdTheLoai: $('#tab2theloai').val()
		}
		//goi api
		if ($.cookie('token')){
			$http.post('http://localhost:3000/books/api/update?token=' + $.cookie('token'), book).then(
				function(response){
					//success
					if (response.data.success == false){
						alert('Thao tác thất bại');
					}else{
						alert('Cập nhật sách thành công!');
					}
				});
		}else{
			alert('Vui lòng đăng nhập');
		}
	}
	$scope.adminxoasach = function(){
		//get data
		var book = {
			IdSach: $('#tab3idsach').val()
		}
		//goi api
		if ($.cookie('token')){
			$http.post('http://localhost:3000/books/api/delete?token=' + $.cookie('token'), book).then(
				function(response){
					//success
					if (response.data.success == false){
						alert('Thao tác thất bại');
					}else{
						alert('Xóa sách thành công!');
					}
				});
		}else{
			alert('Vui lòng đăng nhập');
		}
	}
	$scope.adminthemtheloai = function(){
		//get data
		var theloai = {
			TenTheLoai: $('#tab4tentheloai').val()
		}
		//goi api
		if ($.cookie('token')){
			$http.post('http://localhost:3000/gernes/new?token=' + $.cookie('token'), theloai).then(
				function(response){
					//success
					if (response.data.success == false){
						alert('Thao tác thất bại');
					}else{
						alert('Thêm thể loại thành công!');
					}
				});
		}else{
			alert('Vui lòng đăng nhập');
		}
	}
	$scope.admincapnhattheloai = function(){
		var theloai = {
			IdTheLoai: $('#tab5idtheloai').val(),
			TenTheLoai: $('#tab5tentheloai').val()
		}
		//goi api
		if ($.cookie('token')){
			$http.post('http://localhost:3000/gernes/new?token=' + $.cookie('token'), theloai).then(
				function(response){
					//success
					if (response.data.success == false){
						alert('Thao tác thất bại');
					}else{
						alert('Cập nhật thể loại thành công!');
					}
				});
		}else{
			alert('Vui lòng đăng nhập');
		}
	}
	$scope.adminxoatheloai = function(){
		var theloai = {
			IdTheLoai: $('#tab6idtheloai').val()
		}
		//goi api
		if ($.cookie('token')){
			$http.post('http://localhost:3000/gernes/new?token=' + $.cookie('token'), theloai).then(
				function(response){
					//success
					if (response.data.success == false){
						alert('Thao tác thất bại');
					}else{
						alert('Xóa thể loại thành công!');
					}
				});
		}else{
			alert('Vui lòng đăng nhập');
		}
	}
});
app.controller('registerController', function($scope, $http, $routeParams, $rootScope){
	$scope.dangky = function(){
		//dang ky
		var newuser = {
			Username: $('#dkusername').val(),
			Password: $('#dkpassword').val(),
			Fullname: $('#dkfullname').val(),
			Email: $('#dkemail').val(),
			Phone: $('#dkphone').val()
		}
		$http.post('http://localhost:3000/users/create', newuser)
		.then(
			function(response){
				//success
				console.log(response);
				if (response.data.success == false){
					alert(response.data.message);
				}else{
					alert("Đăng ký thành công!");
					window.location = "#/home/0";
				}
				
			},
			function(response){
				//error
				console.log("error");
			}
		);
	}
});
app.controller('cartController', function($scope, $route, $http, $templateCache){
	//load ds the loai
	$http.get('http://localhost:3000/gernes/get/all')
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
	$scope.carts = JSON.parse($.cookie('cart'));
	var sachs =  JSON.parse($.cookie('cart'));
	var tongtien = 0;
	for (var i = 0; i < sachs.length; i++){
		tongtien += sachs[i].soluong*sachs[i].gia;
	}
	$scope.tongtien = tongtien;
	$scope.dathang = function(){
		if ($.cookie('useridfb')){
			//.......................................
		}else if ($.cookie('useriddn')){
			//tao don hang moi add_order body.IdUser
			var _sachs =  JSON.parse($.cookie('cart'));
			console.log(_sachs.length);
			for (var i = 0; i < _sachs.length; i++){
				var dh = {
					IdUser: $.cookie('useriddn'),
					IdBook: _sachs[i].idsach,
					SoLuong: _sachs[i].soluong,
					DiaChiNhan: $('#diachi').val(),
					SDTNhan: $('#sdt').val(),
					IdDonHang: $.cookie('newdonhang')
				}
				$http.post('http://localhost:3000/order_details/api/new?token=' + $.cookie('token'), dh).then(
					function(response){
						console.log(response);
					},
					function(response){
						console.log("error");
					}
				);
			}
			//cap nhat gia
			var cn =  JSON.parse($.cookie('cart'));
			var sum = 0;
			for (var i = 0; i < cn.length; i++){
				sum += cn[i].soluong*cn[i].gia;
			}
			var capnhat = {
				TongGia: sum,
				IdDonHang: $.cookie('newdonhang')
			}
			$http.put('http://localhost:3000/orders/api/update/sum?token=' + $.cookie('token'), capnhat).then(
				function(response){
					console.log(response);
				}
			);
			alert("Thao tác thành công");
		}else{
			alert('Vui lòng đăng nhập');
		}
		//update_sum IdDonHang TongGia
		//update_state IdDonHang TrangThai
	}
});

app.controller('homeController', function($scope, $http, $routeParams, $rootScope){
	//load ds the loai
	$http.get('http://localhost:3000/gernes/get/all')
		.then(
			function(response){
				//success
				$scope.types = response.data;
			}, 
			function(response){
				//error
				console.log("error");
			}
		);

	//ham dang nhap dã chyen di

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
		$http.get('http://localhost:3000/books/get/gerne/' + $routeParams.type)
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
		var iidsach = $(e.currentTarget).attr("iidsach");
		var itensach = $(e.currentTarget).attr("itensach");
		var itacgia = $(e.currentTarget).attr("itacgia");
		var igia = $(e.currentTarget).attr("igia");
		var ingonngu = $(e.currentTarget).attr("ingonngu");
		var isotrang = $(e.currentTarget).attr("isotrang");
		var inxb = $(e.currentTarget).attr("inxb");
		$.cookie('cidsach', iidsach);
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

app.controller('loginController', function($scope, $route, $http, $templateCache){
	$scope.dnfb = function(){
		FB.login(function(response) {
			if (response.authResponse) {
				console.log('Welcome!  Fetching your information.... ');
				FB.api('/me', function(response) {
					console.log('Good to see you, ' + response.name + '.');
					$.cookie('usernamefb', response.name);
					$.cookie('useridfb', response.id);
					//alert(response.id);
					var accessToken = FB.getAuthResponse();
					console.log(accessToken);
					//window.location.reload(true);
					window.location = "#/home/0";
					window.location.reload(true);
				});
			} else {
				console.log('User cancelled login or did not fully authorize.');
			}
		});
	}
	$scope.dangnhap = function(){
		var username = $('#username').val();
		var password = $('#password').val();
		var user = {
			Username: username,
			Password: password
		}
		console.log(user);
		$http.post('http://localhost:3000/users/login', user).then(
			function(response){
				//success
				console.log("thanh cong");
				console.log(response.data.success);
				if (response.data.success == true){
					var token = response.data.token;
					$.cookie('token', token);
					//lay thong tin username
					$http.get('http://localhost:3000/users/api/get/detail/' + username + "?token=" + token).then(
						function(response){
							var r = JSON.stringify(response.data);
							var m = JSON.parse(r);
							console.log(m[0]);
							console.log(m[0].IDUser);
							$.cookie('useriddn', m[0].IDUser);
						},
						function(response){

						}
					)

					$.cookie('usernamedn', username);
					if (username == 'admin'){
						window.location = "#/admin";
						window.location.reload(true);
					} else{
						window.location = "#/home/0";
						window.location.reload(true);
					}
				}else{
					alert("Đăng nhập thất bại! " + response.data.message);
				}
			},
			function(response){
				//error
				console.log("loi");
			}
		)
		

		// var O = {
		// 	"TenTheLoai": "nakun1"
		// }
		// $http({
		// 	method: 'POST',
		// 	url: 'http://localhost:3000/gernes/new',
		// 	data: JSON.stringify(O)
		// })
		// .then(function (success) {
		// 	console.log("tc");
		// }, function (error) {
		// 	console.log("tb");
		// });

		//cap nhat vao bang MaDatCho|Ten|HoChieu
		// console.log(O);
		// $http.post('http://localhost:3000/gernes/new', O).then(function(data){
		// 	console.log("thanh cong");
		// });

		// if (username == "abc" && password == "abc"){
		// 	alert("Dang nhap thanh cong");
		// 	$.cookie('username', 'abc');	
		// 	window.location = "#/home";
		// }

	}
});

app.controller('searchController', function($scope, $http){
	//load menu loai
	$http.get('http://localhost:3000/gernes/get/all')
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
	//chi tiet sach
	$scope.chitietsach = function(e){
		//lay cac thông so sach sa chon -> cookie
		var iidsach = $(e.currentTarget).attr("iidsach");
		var itensach = $(e.currentTarget).attr("itensach");
		var itacgia = $(e.currentTarget).attr("itacgia");
		var igia = $(e.currentTarget).attr("igia");
		var ingonngu = $(e.currentTarget).attr("ingonngu");
		var isotrang = $(e.currentTarget).attr("isotrang");
		var inxb = $(e.currentTarget).attr("inxb");
		$.cookie('cidsach', iidsach);
		$.cookie('ctensach', itensach);
		$.cookie('ctacgia', itacgia);
		$.cookie('cgia', igia);
		$.cookie('cngonngu', ingonngu);
		$.cookie('csotrang', isotrang);
		$.cookie('cnxb', inxb);
		//chuyen sang trang chi tiet
		window.location = "#/detail";
	}
});

app.controller('detailController', function($scope, $http){
	//load menu loai
	$http.get('http://localhost:3000/gernes/get/all')
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
	$scope.iidsach = $.cookie('cidsach');
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
	$scope.addcart = function(){
		if ($.cookie('username')){
			//da dang nhap
			var book = {
				username: $.cookie('username'),
				idsach: $.cookie('cidsach'),
				tensach: $.cookie('ctensach'),
				gia: $.cookie('cgia'),
				soluong: $('#soluong').val()
			}
			cart.push(book);
			$.cookie('cart', JSON.stringify(cart));
			var newdonhang = {
				IdUser: $.cookie('useriddn')
			}
			$http.post('http://localhost:3000/orders/api/new?token=' + $.cookie('token'), newdonhang).then(
				function(response){
					console.log(response);
					$.cookie('newdonhang', response.data.IdDonHang);
					window.location = "#/cart";
				}
			);
			}else{
			//chua dang nhap
			alert("vui long dang nhap");
		}
	};
});
