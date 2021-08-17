"use strict";
/*global angular*/
angular.module('odiseo')
        .controller('OdontogramaController', OdontogramaController);
OdontogramaController['$inject'] = ['$scope', 'OdontogramaService', '$routeParams', 'PacienteService', 'MenuService', '$timeout', '$location', '$route', '$mdDialog', '$window', 'SpeechRecognitionAPI', 'CommonService', 'RIPSService'];

function OdontogramaController($scope, OdontogramaService, $routeParams, PacienteService, MenuService, $timeout, $location, $route, $mdDialog, $window, SpeechRecognitionAPI, CommonService, RIPSService) {
  
    const ACTIVE_ACTION_NO_ACTION = 'noaction';

    var vm = this;
    vm.odontograma = {};
    vm.odontograma.data = [];
    vm.activeAction = 'caries';
    vm.id = $routeParams.id || null;
    vm.idPaciente = $routeParams.idPaciente || null;
    vm.onDataUpdated = {};
    vm.busy = false;
    vm.isSaved = false;
    vm.commands = {};
    vm.autores = CommonService.autores;
    vm.paciente = PacienteService.paciente;
    vm.menu = MenuService.menu;

    vm.mode = $routeParams.mode || "evolucion";

    PacienteService.getPaciente(vm.idPaciente).then(function () {
        vm.paciente = PacienteService.paciente;
        onDataResult();
    });
    if (vm.id != null) {
        vm.busy = true;
        OdontogramaService.getOdontograma(vm.id, vm.mode).then(function () {
            vm.odontograma = OdontogramaService.odontograma;
            $timeout(vm.onDataUpdated.callback);
            vm.isSaved = true;
            vm.activeAction = ACTIVE_ACTION_NO_ACTION;
            onDataResult();
        });
        

    } else if (vm.idPaciente != null) {
        vm.busy = true;
        
        OdontogramaService.getOdontogramaByIdPaciente(vm.idPaciente, vm.mode).then(function () {
            if (OdontogramaService.odontograma) {
                vm.odontograma = OdontogramaService.odontograma;
                $timeout(vm.onDataUpdated.callback);
                vm.isSaved = true;
                if(vm.mode == "inicial"){
                    vm.activeAction = ACTIVE_ACTION_NO_ACTION;
                }
            } else {
                vm.mode = "inicial";
                $mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Odontograma primera vez')
                        .textContent('Como nuestro paciente es nuevo, debemos crear su primer odontograma')
                        .ok('ok')
                        );
            }
            onDataResult();
        });
    }
    vm.setAction = function (activeAction) {
        if (vm.isSaved && vm.mode != "evolucion") {
            $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('¡Atencion!')
                    .textContent('Este odontograma no se puede modificar')
                    .ok('ok')
                    );
            return;
        }
        vm.activeAction = activeAction;
    };
    vm.onApplyAction = function (diente, zona) {
        if (typeof vm.odontograma.data[diente] == 'undefined' || vm.odontograma.data[diente] == null) {
            vm.odontograma.data[diente] = [];
        }
        vm.odontograma.data[diente][zona] = vm.activeAction;
        if (vm.activeAction == 'borrar') {
            vm.odontograma.data[diente] = [];
        }

        if(vm.activeAction != ACTIVE_ACTION_NO_ACTION){
            vm.isSaved = false;
        }
        
    }

    function save() {
        vm.busy = true;
        vm.odontograma.IdPaciente = vm.idPaciente;
        vm.odontograma.Autor = vm.autores.selectedProfesional;
        OdontogramaService.createOdontograma(vm.odontograma, vm.mode).then(function() {
            vm.odontograma = OdontogramaService.odontograma;
            vm.isSaved = true;
            vm.mode = "evolucion";
            onDataResult();
        });
        vm.showRIPSDialog();
    }

    vm.showRIPSDialog = function(ev) {

        if(vm.mode == "evolucion"){
            $mdDialog.show({
                controller: function($scope, $mdDialog){
                  $scope.closeDialog = function(data) {
                      $mdDialog.hide(data);
                    }
                },
                templateUrl: '/app/RIPS/ProcedimientosRIPSDialogTemplate.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
              })
              .then(function(data) {
                RIPSService.createProcedimientoRIPS(vm.idPaciente, data);
              }, function() {
      
              });
        }else{
            $mdDialog.show({
                controller: function($scope, $mdDialog){
                  $scope.closeDialog = function(data) {
                      $mdDialog.hide(data);
                    }
                },
                templateUrl: '/app/RIPS/ConsultaRIPSDialogTemplate.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
              })
              .then(function(data) {
                RIPSService.createConsultaRIPS(vm.idPaciente, data);
              }, function() {
      
              });
        }

      };

    function onDataResult() {
        vm.busy = false;
    }

    vm.openNewTab = function () {
        $window.open('/#/paciente/', '_blank');
    }
    var applyOnResult = function () {
        $scope.$apply();
    }
    SpeechRecognitionAPI.addCallback('resultMatch', applyOnResult, vm);
    SpeechRecognitionAPI.addCommands({
        'caries :zona en el :diente': applyAction,
        'guardar': save
    }, 'form')

    function applyAction(zona, diente) {
        switch (zona) {
            case 'oclusal':
                zona = 5;
                break;
            default:
        }
        vm.commands.applyAction('caries', diente, zona);
    }

}
