<!DOCTYPE html>
<html ng-app="artbeat">
  <head>
	<script src="https://maps.googleapis.com/maps/api/js"></script>
    <link rel="stylesheet" type="text/css" href="/assets/css/style.css" />
    <script type="text/javascript" src="/assets/js/jquery.min.js"></script>
    <script type="text/javascript" src="/assets/js/angular-1.3.8/angular.min.js"></script>
    <script type="text/javascript" src="/assets/js/angular-1.3.8/angular-route.min.js"></script>
    <script type="text/javascript" src="/assets/js/directives.js"></script>
    <script type="text/javascript" src="/assets/js/artbeat.js"></script>
  </head>

  <body ng-controller="ArtbeatController as artbeat">
    <header>
		<div class="left_buttons">
			<a href="/home" ng-class="{ active:artbeat.page=='home' }">Home</a>
			<a href="/profile" ng-class="{ active:artbeat.page=='profile' }">Profile</a>
			<a href="/event" ng-class="{ active:artbeat.page=='event' }">Event</a>
		</div>
		<div class="head_profile" ng-show="artbeat.user">Bonjour {{artbeat.user.name}}</div>
		<div class="head_profile" ng-show="!artbeat.user">Non connecté</div>
    </header>
	<nav>
	</nav>
	<page ng-controller="PageController as page">
		<ng-include src="'/assets/html/page/'+artbeat.page+'.html'"></ng-include>
		<!--home></home-->
	</page>
  </body>
</html>
