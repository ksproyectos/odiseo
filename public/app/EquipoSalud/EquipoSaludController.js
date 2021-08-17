"use strict";
angular.module('odiseo')
        .controller('EquipoSaludController', EquipoSaludController);
EquipoSaludController['$inject'] = ['$scope', '$location', 'EquipoSaludService', 'MenuService', 'PacienteService', '$route', '$routeParams'];
function EquipoSaludController($scope, $location, EquipoSaludService, MenuService, PacienteService, $route, $routeParams) {
    var vm = this;
    vm.title = "Equipo de Salud";
    vm.items = null;
    vm.error = false;
    vm.limit = 10;
    vm.page = 1;
    vm.paciente = PacienteService.paciente;;

    vm.edit = function (id) {
        $location.path('/equipo-salud/' + id);
    };

    vm.add = function () {
        $location.path('/equipo-salud/new');
    };

    EquipoSaludService.getEquipoSalud().then(
            function (response) {
                vm.items = response;
            },
            function (response) {
                console.log(response);
                vm.error = true;
            }
    );

    function onDataResult() {
        vm.busy = false;
        loadMenu();
    }

}
