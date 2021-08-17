"use strict";
angular.module('odiseo')
        .controller('TratamientosController', TratamientosController);
TratamientosController['$inject'] = ['$scope', '$location', 'TratamientosService', 'MenuService', 'PacienteService', '$route', '$routeParams'];
function TratamientosController($scope, $location, TratamientosService, MenuService, PacienteService, $route, $routeParams) {
    var vm = this;
    vm.title = "Tratamientos";
    vm.items = null;
    vm.error = false;
    vm.limit = 10;
    vm.page = 1;
    vm.paciente = PacienteService.paciente;
    vm.menu = MenuService.menu;
    vm.edit = function (id) {
        $location.path('/tratamientos/' + id);
    };

    vm.add = function () {
        $location.path('/tratamientos/new');
    };

    vm.delete = function (id) {
        TratamientosService.deleteTratamiento(id).then(function (result) {
            onDataResult();
            vm.getAllTratamientos();
        });
    };
    vm.getAllTratamientos = function () {
        TratamientosService.getTratamientos().then(
                function (response) {
                    vm.items = response;
                },
                function (response) {
                    console.log(response);
                    vm.error = true;
                }
        );
    };
    vm.getAllTratamientos();

    function onDataResult() {
        vm.busy = false;
        loadMenu();
    }

}
