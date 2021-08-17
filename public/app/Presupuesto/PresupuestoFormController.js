"use strict";
angular.module('odiseo')
        .controller('PresupuestoFormController', PresupuestoFormController);
PresupuestoFormController['$inject'] = ['$scope', '$routeParams', '$location', '$filter', 'PresupuestoService', '$mdDialog', '$mdToast', 'PacienteService', 'MenuService', '$route', 'TratamientosService'];
function PresupuestoFormController($scope, $routeParams, $location, $filter, PresupuestoService, $mdDialog, $mdToast, PacienteService, MenuService, $route, TratamientosService) {
    var vm = this;
    vm.isEdit = $routeParams.id ? true : false;
    vm.title = $routeParams.id ? 'Actualizar tratamiento' : 'Crear tratamiento';
    vm.btnTxt = $routeParams.id ? 'Actualizar' : 'Crear';
    vm.tratamientoPresupuesto = null;
    vm.tratamientos = {};
    vm.id = $routeParams.id || null;
    vm.busy = true;
    vm.error = false;
    vm.paciente = PacienteService.paciente;
    vm.idPaciente = $routeParams.idPaciente || false;
    vm.menu = MenuService.menu;
    
    vm.calcularValorNeto = function(){
        var totalZonas = 0;
        angular.forEach(vm.tratamientoPresupuesto.Dientes, function(diente, key){         
            angular.forEach(diente, function(zona, key){
                if(zona){
                    totalZonas++;
                }    
            });
        });
        if(totalZonas == 0){
            vm.tratamientoPresupuesto.ValorBruto = $filter('filter')(vm.tratamientos, {_id: vm.tratamientoPresupuesto.IdTratamiento})[0].Valor;
        }else{
            vm.tratamientoPresupuesto.ValorBruto = $filter('filter')(vm.tratamientos, {_id: vm.tratamientoPresupuesto.IdTratamiento})[0].Valor * totalZonas;
        }
        if(vm.tratamientoPresupuesto.Descuento >= 0){
            vm.tratamientoPresupuesto.Valor = vm.tratamientoPresupuesto.ValorBruto - vm.tratamientoPresupuesto.Descuento;
        }else{
            vm.tratamientoPresupuesto.Valor = vm.tratamientoPresupuesto.ValorBruto;
        }
    }
    TratamientosService.getTratamientos().then(
            function (response) {
                vm.tratamientos = response;
            },
            function (response) {
                console.log(response);
                vm.error = true;
            }
    );
    
    if (vm.isEdit) {
        PresupuestoService.getTratamiento(vm.id).then(
                function (response) {
                    vm.tratamientoPresupuesto = response;
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
        vm.tratamientoPresupuesto = {};
    }

    vm.submitForm = function () {
        vm.busy = true;
        if (vm.isEdit) {
            PresupuestoService.putTratamiento(vm.id, vm.tratamientoPresupuesto).then(
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
            vm.tratamientoPresupuesto.IdPaciente = vm.idPaciente;
            PresupuestoService.postTratamiento(vm.tratamientoPresupuesto).then(
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
            $location.path('/paciente/' + vm.idPaciente + '/presupuesto');
        }
    }
    vm.cancel = function () {
        $location.path('/paciente/' + vm.idPaciente + '/presupuesto');
    }
    if (vm.idPaciente) {
        PacienteService.getPaciente(vm.idPaciente).then(function () {
            vm.paciente = PacienteService.paciente;
            onDataResult();
        });
    }
    function onDataResult() {
        vm.busy = false;
        loadMenu();
    }

}
