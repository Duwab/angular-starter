(function(){
    var app = angular.module('artbeat-directives', []);
	
	
	app.directive("post", function() {
		return {
			restrict: "E",
			templateUrl: "/assets/html/entity/post.html"
		};
    });
	
	app.directive("artwork", function() {
		return {
			restrict: "E",
			templateUrl: "/assets/html/entity/artwork.html"
		};
    });
	
	app.directive("artworkExplore", function() {
		return {
			restrict: "E",
			templateUrl: "/assets/html/entity/explore/artwork.html"
		};
    });
	
	app.directive("home", function() {
		return {
			restrict: "E",
			templateUrl: "/assets/html/page/home.html",
			controller: function() {
				this.name = "Maison";
			},
			controllerAs: "home"
		};
    });
	
	app.directive("suggestFriends", ['getData', function(getData) {
		return {
			restrict: "E",
			templateUrl: "/assets/html/entity/suggest/friends.html",
			controller:function($scope){
				$scope.sgg_profiles = [];
				getData.async('/json/suggest/friends.json').then(function(response){
					$scope.sgg_profiles = response;
				},function(err){
					console.log('error !', err);
				});
			}
		};
    }]);
	
	app.directive("lightbox", function() {
		return {
			restrict: "E",
			templateUrl: "/assets/html/lightbox/frame.html"
		};
    });
	
	app.directive("popup", function() {
		return {
			restrict: "E",
			templateUrl: "/assets/html/lightbox/popup/frame.html"
		};
    });
	
	app.directive("fullscreenArtwork", function() {
		return {
			restrict: "E",
			templateUrl: "/assets/html/lightbox/fullscreen/artwork.html"
		};
    });
	
	app.directive("alert", function() {
		return {
			restrict: "E",
			templateUrl: "/assets/html/lightbox/popup/alert/test.html"
		};
    });
	
	
	
	app.directive('popup', ['lightbox', function(lightbox) {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				elem.on('click', function(e){
					lightbox.build("popup");
				});
			}
		}
	}]);
	
	app.directive('lightbox', function(lightbox) {
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				elem.on('click', function(e){
					lightbox.build("default");
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
    
  })();
