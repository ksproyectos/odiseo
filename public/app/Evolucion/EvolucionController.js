"use strict";
/*global angular*/
angular.module('odiseo')
        .controller('EvolucionController', EvolucionController);
EvolucionController['$inject'] = ['$scope', 'SpeechRecognitionAPI', 'EvolucionService', '$routeParams', 'PacienteService', 'MenuService', '$location', '$route', '$window', 'CommonService', '$mdDialog'];

function EvolucionController($scope, SpeechRecognitionAPI, EvolucionService, $routeParams, PacienteService, MenuService, $location, $route, $window, CommonService, $mdDialog) {
    var vm = this;

    vm.id = $routeParams.id || null;
    vm.idPaciente = $routeParams.idPaciente;
    vm.busy = false;
    vm.evolucion = [];
    vm.row = {}
    vm.limit = 10;
    vm.page = 1;
    vm.paciente = PacienteService.paciente;
    vm.autores = CommonService.autores;
    vm.menu = MenuService.menu;
    var applyOnResult = function() {
        $scope.$apply();
    }
    PacienteService.getPaciente(vm.idPaciente).then(function() {
        vm.paciente = PacienteService.paciente;
        onDataResult();
    });

    function save() {
        if (!vm.busy) {
            if (vm.evolucionForm.$error.required) {
                $mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Validando...')
                        .textContent('Aun falta informacion necesaria, verifica los datos requeridos')
                        .ok('ok')
                        );

                return;
            }

            if (!vm.evolucionForm.$valid) {

                return;
            }
            vm.busy = true;
            vm.row.IdPaciente = vm.idPaciente;
            vm.row.Autor = vm.autores.selectedProfesional;
            EvolucionService.createEvolucionRow(vm.row).then(function (result) {
                if (result) {
                    vm.evolucion.push(result);
                    vm.row = '';
                    vm.evolucionForm.$setPristine();
                }
                onDataResult();
            });

        }
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
    EvolucionService.getEvolucion(vm.idPaciente).then(function (result) {
        if (result) {
            vm.evolucion = result;
        } else {
            vm.evolucion = [];
        }
        onDataResult();
    });
    vm.openNewTab = function () {
        $window.open('/#/paciente/', '_blank');
    }
}
  