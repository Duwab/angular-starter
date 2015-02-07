(function() {
	var app = angular.module('artbeat', ['ngRoute', 'artbeat-directives']);
	var artbeat;
	var ws = {
		emitNav : function(from, to, info){console.log('emitNav ws', from, to, info);}
	};
	
	
	//	--- Test providers, services, factories		=>		http://blog.xebia.com/2013/09/01/differences-between-providers-in-angularjs/
	var MyFunc = function() {
		this.name = "default name";
		this.$get = function() {
			return "MyFunc.$get(). this.name = " + this.name;
		};
		this.setVersion = function(newValue){
			this.name = newValue;
		}
		return "MyFunc(). this.name = " + this.name;
	};

	app.provider( 'myProv', MyFunc );	//injecté, myProv sera le résultat du $get

	app.service( 'myService', MyFunc );	//injecté, myService sera MyFunc

	app.factory( 'myFactory', MyFunc );	//injecté, myFactory sera le résultat de la fonction (le return)
	//  --- End test providers

	
	app.factory('getData', function($http) {
		var promise; // cache
		var myService = {
			async: function(url) {
				if ( !promise ) {
					promise = $http.get(url).then(function (response) {
						if(response.data && response.data.status == "Success")
							return response.data.data;
						else
							throw response.data;
					}, function(err){	// vérifier l'utilité
						throw err;
					});
				}
				return promise;
			}
		};
		return myService;
	});
	
	app.factory('lightbox', function(getData) {
		return {
			build : function(type, template, options){
				console.log('build lightbox', getData, type, template);
				options = options || {};
				var lbx = $('<lightbox></lightbox>');
				$('body').append(artbeat.compile(lbx)(artbeat.scope));
				artbeat.scope.typeLbx = type;
				artbeat.scope.$apply();
				artbeat.addLightbox(lbx);
				lbx.on('click', function(){
					if($('.lbx_frame_content:hover', lbx).length == 0)
					{
						lbx.remove();
						artbeat.delLightbox(lbx);
					}
				});
				lbx.on('validate', function(){
					lbx.remove();
					artbeat.delLightbox(lbx);
				});
				lbx.on('cancel', function(){
					alert('You suck!');
					lbx.remove();
					artbeat.delLightbox(lbx);
				});
			}
		}
	});
	
	app.config(function($routeProvider, $locationProvider, myProvProvider) {
		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
		myProvProvider.setVersion(2);
		/*
		$routeProvider
			.when('/profile', { template: 'page1.html', controller: 'Page1Ctrl' })
			.when('/page2', { template: 'page2.html', controller: 'Page2Ctrl' })
			.otherwise({
			  redirectTo: '/'
			});
		*/
	});
	
	app.controller('ArtbeatController', ['$http', '$location', '$scope', '$compile', function($http, $location, $scope, $compile){
		artbeat = this;
		artbeat.lightbox = {count: 0};
		artbeat.scope = $scope;
		artbeat.compile = $compile;
		
		/* Pour le test en incluant ces providers dans la liste à l'initialisation du controller
		$scope.serviceOutput = myService;
		$scope.factoryOutput = myFactory;
		$scope.providerOutput = myProv; */
		
		artbeat.refreshLocation = function(){
			artbeat.page = urlParse(location.pathname)[0];
		};
		artbeat.refreshLocation();
		
		artbeat.user = false;
		$http.get('/json/profile.json').success(function(data){
			if(data.status == "Success")
				artbeat.user = data.data;
		});
		$http.get('/json/post.json').success(function(data){
			if(data.status == "Success")
				$scope.post = data.data[0];
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
	
	app.controller('PageController', ['$http', '$location', '$scope', '$compile', function($http, $location, $scope, $compile){
		// page controller, certainly not necessary
	}]);
	
	app.controller('ProfileController', ['$http', '$location', '$scope', '$compile', function($http, $location, $scope, $compile){
		// specific controller for profile page...
		// to load only if necessary, and if you currently haven't loaded this controller, just open another page (end of SPA) or try to use requireJS
	}]);
	
	
	/*
	 *
	 *	--> Navigation -->
	 *
	*/
	
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
	
})();


