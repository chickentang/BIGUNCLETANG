define(['app', 'jquery'], function (app) {
    //console.dir(app);
	app.register.controller('DirectController', ['$rootScope', '$location', '$scope', '$state', '$location', '$timeout', function ($rootScope, $location, $scope, $state, $location, $timeout) {




		$scope.initializeController = function () {
			directToChild();
			//检测到路由变化就实行跳转
			$scope.$on('$stateChangeSuccess', function (scope, next, current) {
				directToChild()
	        });
		};
		

		
		$scope.$watch("menuItems", function(menuItems){
			if(menuItems != null){
				directToChild();
			}	
		})



		function directToChild(){
			var route = $location.$$path.split("/").join(".").slice(1);
			//console.dir($rootScope);
			//console.log($rootScope.menuItems);
			if($rootScope.menuItems != null){
				//遍历导航一遍跳转到一级菜单的子目录
				var menus = [];//用来存储所有导航

				function pushMenu(menu){
					menus.push(menu);
					if(menu.subMenus && menu.subMenus.length>0){
						for(var i=0, len=menu.subMenus.length; i<len; i++){
							pushMenu(menu.subMenus[i]);
						}
					}
				}

				//先把所有的菜单push到数组menus里
				for(var i=0, len=$rootScope.menuItems.length; i<len; i++){
					pushMenu($rootScope.menuItems[i]);
				}

				
				//检测跳转到正确的子菜单
				for(var j=0, menusLen= menus.length; j<menusLen; j++){
					//console.log(11);
					if(route === menus[j].href){
						//console.log(route);
						//console.log(menus[j]);
						if(menus[j].subMenus && menus[j].subMenus.length>0){
							//console.log("hehe");
							//console.log(menus[j].subMenus[0].href);
							if(menus[j].subMenus[0].target == 1){
								//alert(1);
								$state.go(menus[j].subMenus[0].href);
							}else if(menus[j].subMenus[0].target == 2){
								//alert(222);
								$state.go("app.embed", {"menuId": menus[j].subMenus[0].menuId});
							}
							//$state.go()
						}
					}
					//console.dir(menus[j]);
				}

			}
		}

		


	}]);
});
