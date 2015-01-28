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
	
	app.directive("alert", function() {
		return {
			restrict: "E",
			templateUrl: "/assets/html/lightbox/popup/alert/test.html"
		};
    });
    
  })();
