"use strict";
/*global angular*/
angular.module('odiseo')
        .controller('PresupuestoController', PresupuestoController);
PresupuestoController['$inject'] = ['$scope', 'SpeechRecognitionAPI', 'PresupuestoService', '$routeParams', 'PacienteService', 'MenuService', '$location', '$route', '$window', 'CommonService', '$mdDialog', 'PagosService'];

function PresupuestoController($scope, SpeechRecognitionAPI, PresupuestoService, $routeParams, PacienteService, MenuService, $location, $route, $window, CommonService, $mdDialog, PagosService) {
    var vm = this;

    vm.id = $routeParams.id || null;
    vm.idPaciente = $routeParams.idPaciente;
    vm.busy = false;
    vm.presupuesto = [];
    vm.limit = 10;
    vm.page = 1;
    vm.selected = [];
    vm.pagos = null;
    vm.paciente = PacienteService.paciente;
    vm.autores = CommonService.autores;
    vm.menu = MenuService.menu;
    var applyOnResult = function () {
        $scope.$apply();
    }
    if (vm.idPaciente) {
        PacienteService.getPaciente(vm.idPaciente).then(function () {
            vm.paciente = PacienteService.paciente;
            onDataResult();
        });
    }

    vm.getValorTotal = function () {
        var total = 0;
        angular.forEach(vm.presupuesto, function (value, key) {
            total += value.Valor;
        });
        return total;
    }
    vm.getTotalPagos = function () {
        var total = 0;
        angular.forEach(vm.pagos, function (value, key) {
            total += value.Valor;
        });
        return total;
    }

    vm.delete = function (id) {
        PresupuestoService.deleteTratamiento(id).then(function (result) {
            onDataResult();
            vm.getAllPresupuestoTratamientos();
        });
    };

    vm.add = function () {
        $location.path('/paciente/' + vm.idPaciente + '/presupuesto/new');

    };
    
    vm.contarZonas = function(zonas){
        var cantidad = 0;
        for (var zona in zonas){
            if(zona){
                cantidad++;
            }
        }
        return cantidad;
    }
    
    function onDataResult() {
        vm.busy = false;
        loadMenu();
    }

    $scope.$watch(
            function watch(scope) {
                return (vm.row);
            },
            function onChangePaciente() {
                loadMenu();
            }, true);

    

    vm.busy = true;
    vm.getAllPresupuestoTratamientos = function(){
            PresupuestoService.getPresupuesto(vm.idPaciente).then(function (result) {
            if (result) {
                vm.presupuesto = result;
            } else {
                vm.presupuesto = [];
            }
            onDataResult();
        });
    }
    vm.getAllPresupuestoTratamientos();
    vm.openNewTab = function () {
        $window.open('/#/paciente/', '_blank');
    };

    PagosService.getPagos(vm.idPaciente).then(
            function (response) {
                vm.pagos = response;
            },
            function (response) {
                console.log(response);
                vm.error = true;
            }
    );

}
  