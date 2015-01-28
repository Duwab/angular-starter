(function() {
	var app = angular.module('artbeat', ['ngRoute', 'artbeat-directives']);
	var artbeat;
	var ws = {
		emitNav : function(from, to, info){console.log('emitNav ws', from, to, info);}
	};
	
	var ProvFunc = function(){
		var version = 1;
		return {
			$get : function(){
				return {version:version, title: 'Artbeat Angular'};
			},
			setVersion : function(newValue){
				version = newValue;
			}
		};
	}

	app.provider( 'myProv', ProvFunc );  //injecté, myProv sera le résultat du get
	
	app.config(function($routeProvider, $locationProvider, myProvProvider) {
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
		myProvProvider.setVersion(2);
		/* $routeProvider
		.when('/profile', { template: 'page1.html', controller: 'Page1Ctrl' })
		.when('/page2', { template: 'page2.html', controller: 'Page2Ctrl' })
		.otherwise({
		  redirectTo: '/'
		}); */
	});
	
	
	/* 
		Test providers, services, factories
	*/
	
	var MyFunc = function() {

		this.name = "default name";

		this.$get = function() {
			this.name = "new name"
			return "Hello from MyFunc.$get(). this.name = " + this.name;
		};

		return "Hello from MyFunc(). this.name = " + this.name;
	};
	
	//http://blog.xebia.com/2013/09/01/differences-between-providers-in-angularjs/

	app.service( 'myService', MyFunc ); //injecté, myService sera MyFunc

	app.factory( 'myFactory', MyFunc ); //injecté, myFactory sera le résultat de la fonction (le return)
	
	app.controller('ArtbeatController', ['$http', '$location', '$scope', '$compile', 'myService', 'myFactory', 'myProv', function($http, $location, $scope, $compile, myService, myFactory, myProv){
		artbeat = this;
		artbeat.lightbox = {count: 0};
		artbeat.scope = $scope;
		artbeat.compile = $compile;
		
		$scope.serviceOutput = myService;
		$scope.factoryOutput = myFactory;
		$scope.providerOutput = myProv;
		
		artbeat.refreshLocation = function(){
			artbeat.page = urlParse(location.pathname)[0];
		};
		artbeat.refreshLocation();
		
		artbeat.user = false;
		$http.get('/json/profile.json').success(function(data){
			console.log('premier');
			if(data.status == "Success")
				artbeat.user = data.data;
		});
		$http.get('/json/post.json').success(function(data){
			if(data.status == "Success")
				$scope.post = data.data[0];
			console.log($scope.post);
		});
		$http.get('/json/artwork.json').success(function(data){
			if(data.status == "Success")
				$scope.artwork = data.data;
		});
		$http.get('/json/event.json').success(function(data){
			if(data.status == "Success")
				$scope.event = data.data;
		});
		
		$scope.logout = function(page){
			artbeat.user = false;
		}
		
		$scope.test_lightbox = function(page){
			lightbox();
		}
		
		$scope.test_popup = function(page){
			popup();
		}
		
		$scope.$watch(function () { return $location.url(); }, function (url) {
			/* if (url) {
				$scope.query = $location.search().q
				$scope.search();
			} */
			console.log('url watch ' + artbeat.url);
		});
	
		artbeat.addLightbox = function(lbx){
			artbeat.lightbox.count++;
			$('body').css('overflow', 'hidden');
		};
		
		artbeat.delLightbox = function(lbx){
			artbeat.lightbox.count--;
			if(artbeat.lightbox.count <= 0)
				$('body').css('overflow', '');
		};

	}]);
	
	app.directive('a', function() {
		return {
			restrict: 'E',
			link: function(scope, elem, attrs) {
				if(attrs.href && attrs.href[0] == '/'){
					elem.on('click', function(e){
						e.preventDefault();
						var href = elem.attr('href');
						console.log('angular a management');
						var url_parse = urlParse(href);
						console.log(url_parse[0]);
						artbeat.page = url_parse[0];
						scope.$apply();
						//$.location(url_parse[0], href);
						window.history.pushState({url: "" + href + ""}, url_parse[0], href);
						artbeat.refreshLocation();
					});
				}
			}
	   };
	});
	
	app.directive('popup', function() {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				elem.on('click', function(e){
					console.log('click popup');
					var lbx = $('<lightbox></lightbox>');
					$('body').append(artbeat.compile(lbx)(scope));
					scope.$apply();
					artbeat.addLightbox(lbx);
					lbx.on('validate', function(){
						// alert('validate');
						lbx.remove();
						artbeat.delLightbox(lbx);
					});
					lbx.on('cancel', function(){
						alert('You suck!');
						lbx.remove();
						artbeat.delLightbox(lbx);
					});
					console.log(lbx);
				});
			}
		}
	});
	
	app.directive('popupValidate', function() {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				elem.on('click', function(e){
					elem.closest('lightbox').trigger('validate');
				});
			}
		}
	});
	
	app.directive('popupCancel', function() {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				elem.on('click', function(e){
					elem.closest('lightbox').trigger('cancel');
				});
			}
		}
	});
	
	app.directive('lightboxArtwork', function() {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				elem.on('click', function(e){
					alert('lightbox-artwork');
				});
			}
		}
	});
	
	app.controller('PageController', ['$http', '$location', '$scope', '$compile', function($http, $location, $scope, $compile){
		/*$http.get('/json/profile.json').success(function(data){
			console.log('deuxieme');
			if(data.status == "Success")
				artbeat.user = false;
		});*/
	}]);
	
	
	function urlParse(url){
		if(typeof url == "string" && ["","/"].indexOf(url.replace('','')) == -1)
		{
			console.log('url parse', url);
			var arr = url.split('/');
			arr.shift();
			return arr;
		}
		return ['home'];
	}
	
	window.onpopstate = function(event){
		console.log('popstate');
		artbeat.refreshLocation();
	}
	
	
	
	function lightbox(tpl, item, options)
	{
		alert('lightbox');
	}
	
	function popup(tpl, options)
	{
		alert('popup');
	}
	
})();


