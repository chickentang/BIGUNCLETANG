define(['app', 'window', 'jquery', 'mainf','filters','homeServices'], function (app, w, $,mf ) {
	//console.dir(app);
	app.register.controller('homeController', ['$location', '$modal', '$filter', '$scope', '$rootScope', '$state', '$interval', '$timeout',  'homeServices', '$window',function ($location, $modal, $filter, $scope, $rootScope, $state, $interval, $timeout, homeServices,$window) {

		$scope.initializeController = function () {
			$scope.loaded = false;//初始化未加载过数据，则隐藏内容区
			mf.MyFrame.prototype.init();
		}

	}]);
});

