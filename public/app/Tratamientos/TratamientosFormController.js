"use strict";
angular.module('odiseo')
        .controller('TratamientosFormController', TratamientosFormController);
TratamientosFormController['$inject'] = ['$scope', '$routeParams', '$location', '$filter', 'TratamientosService', '$mdDialog', '$mdToast', 'PacienteService', 'MenuService', '$route'];
function TratamientosFormController($scope, $routeParams, $location, $filter, TratamientosService, $mdDialog, $mdToast, PacienteService, MenuService, $route) {
    var vm = this;
    vm.isEdit = $routeParams.id ? true : false;
    vm.title = $routeParams.id ? 'Actualizar tratamiento' : 'Crear tratamiento';
    vm.btnTxt = $routeParams.id ? 'Actualizar' : 'Crear';
    vm.tratamiento = null;
    vm.id = $routeParams.id || null;
    vm.busy = true;
    vm.error = false;
    vm.paciente = PacienteService.paciente;
    vm.menu = MenuService.menu;
    if (vm.isEdit) {
        TratamientosService.getTratamiento(vm.id).then(
                function (response) {
                    vm.tratamiento = response;
                    vm.busy = false;
                    vm.error = false;
                },
                function (response) {
                    console.log(response);
                    vm.busy = false;
                    vm.error = true;
                }
        );
    } else {
        vm.busy = false;
        vm.tratamiento = {};
    }

    vm.submitForm = function () {
        vm.busy = true;
        if (vm.isEdit) {
            TratamientosService.putTratamiento(vm.id, vm.tratamiento).then(
                    function (response) {
                        vm.busy = false;
                        vm.showModal();
                    },
                    function (response) {
                        vm.busy = false;
                        console.log(response);
                        vm.showModal(true);
                    }
            );
        } else {
            TratamientosService.postTratamiento(vm.tratamiento).then(
                    function (response) {
                        vm.busy = false;
                        vm.showModal();
                    },
                    function (response) {
                        vm.busy = false;
                        console.log(response);
                        vm.showModal(true);
                    }
            );
        }
    }

    vm.showModal = function (error) {
        var title = !error ? 'Guardado' : 'Error';
        var message = !error ? 'Los cambios han sido guardados correctamente' : 'Los cambios no se guardaron';
        var toast = $mdToast.simple()
                .content(message)
                .hideDelay(3000)
                .position('top right');
        $mdToast.show(toast);
        if (!error) {
             $location.path('/tratamientos');
        }
    }
    vm.cancel = function () {
        $location.path('/tratamientos');
    }
    function onDataResult() {
        vm.busy = false;
        loadMenu();
    }
}
;
