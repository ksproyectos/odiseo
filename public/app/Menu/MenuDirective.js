
angular.module('odiseo')
        .directive("menu", function () {
            return {
                restrict: 'A',
                replace: true,
                templateUrl: 'app/Menu/MenuTemplate.html',
                controller: ['$scope', '$location', 'MenuService', function ($scope, $location, MenuService) {
                        $scope.menu = {};
                        $scope.menu = MenuService.menu;
                        MenuService.addOnOptionChangeEventListener(function() {
                            $scope.menu = MenuService.menu;
                        });
  
                    }]
            };

        });