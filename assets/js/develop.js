(function() {
	var app = angular.module('artbeat', ['artbeat-directives']);
	
	app.controller('ArtbeatController', ['$http', '$location', '$scope', '$compile', function($http, $location, $scope, $compile){
		var artbeat = this;
		
		var object_name = urlParse(window.location.pathname)[2];
		console.log(object_name);
		$('.dev_container').append($compile('<' + object_name + '>')($scope));
		
		$http.get('/json/profile.json').success(function(data){
			console.log('premier');
			if(data.status == "Success")
				$scope.profile = data.data;
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

	}]);
	
	
	function urlParse(url){
		if(typeof url == "string" && ["","/"].indexOf(url) == -1)
		{
			console.log('url parse', url);
			var arr = url.split('/');
			arr.shift();
			return arr;
		}
		return ['home'];
	}
	
})();
