"use strict";
angular.module('odiseo')
        .controller('EquipoSaludFormController', EquipoSaludFormController);
EquipoSaludFormController['$inject'] = ['$scope', '$routeParams', '$location', '$filter', 'EquipoSaludService', '$mdDialog', '$mdToast', 'PacienteService', 'MenuService', '$route'];
function EquipoSaludFormController($scope, $routeParams, $location, $filter, EquipoSaludService, $mdDialog, $mdToast, PacienteService, MenuService, $route) {
    var vm = this;
    vm.isEdit = $routeParams.id ? true : false;
    vm.title = $routeParams.id ? 'Actualizar profesional' : 'Crear profesional';
    vm.btnTxt = $routeParams.id ? 'Actualizar' : 'Crear';
    vm.profesional = null;
    vm.id = $routeParams.id || null;
    vm.busy = true;
    vm.error = false;
    vm.paciente = PacienteService.paciente;
    vm.menu = MenuService.menu;
    if (vm.isEdit) {
        EquipoSaludService.getProfesional(vm.id).then(
                function (response) {
                    vm.profesional = response;
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
        vm.profesional = {};
    }

    vm.submitForm = function () {
        vm.busy = true;
        if (vm.isEdit) {
            EquipoSaludService.putProfesional(vm.id, vm.profesional).then(
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
            EquipoSaludService.postProfesional(vm.profesional).then(
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
            $location.path('/equipo-salud');
        }
    }
    vm.cancel = function () {
        $location.path('/equipo-salud');
    }

    function onDataResult() {
        vm.busy = false;
        loadMenu();
    }


    function loadMenu() {
        MenuService.menu.options = [];
        MenuService.menu.options['a'] = {
            text: "Guardar",
            active: true,
            color: 'color12',
            callback: function () {
                vm.submitForm();
            }
        }
        MenuService.menu.options['b'] = {
            text: "Cancelar",
            active: true,
            color: 'color1',
            callback: function () {
                vm.cancel();
            }
        }
        MenuService.menu.options['d'] = {
            text: "Datos personales",
            active: vm.paciente._id,
            color: 'color18',
            callback: function() {
                $location.path('/paciente/' + vm.paciente._id);
            }
        }
        MenuService.menu.options['c'] = {
            text: "Crear o Buscar Paciente",
            active: true,
            color: 'color9',
            callback: function () {
                $location.path('/paciente/');
            }
        }
        MenuService.menu.options['e'] = {
            text: "Informacion clinica",
            active: vm.paciente._id,
            color: 'color18',
            callback: function () {
                $location.path('/paciente/' + vm.paciente._id + '/documento-general/');
            }
        }
        MenuService.menu.options['f'] = {
            text: "Odontograma",
            active: vm.paciente._id,
            color: 'color18',
            callback: function () {
                $location.path('/paciente/' + vm.paciente._id + '/odontograma/');
            }
        }
        MenuService.menu.options['g'] = {
            text: "Evolucion",
            active: vm.paciente._id,
            color: 'color18',
            callback: function () {
                $location.path('/paciente/' + vm.paciente._id + '/evolucion/');
            }
        }
        MenuService.menu.options['h'] = {
            text: "Agenda",
            active: true,
            color: 'color7',
            callback: function () {
                if(vm.paciente._id){
                    $location.path('/paciente/' + vm.paciente._id + '/agenda/');
                }else{
                     $location.path('/agenda/');
                }
            }
        }
        MenuService.menu.options['i'] = {
            text: "Presupuesto",
            active: vm.paciente._id,
            color: 'color14',
            callback: function () {
                $location.path('/paciente/' + vm.paciente._id + '/presupuesto/');
            }
        }
        MenuService.menu.options['j'] = {
            text: "Pagos",
            active: vm.paciente._id,
            color: 'color14',
            callback: function () {
                $location.path('/paciente/' + vm.paciente._id + '/pagos/');
            }
        }
        MenuService.menu.options['k'] = {
            text: "Tratamientos",
            active: true,
            color: 'color20',
            callback: function () {
                $location.path('/tratamientos/');
            }
        }
        MenuService.menu.options['l'] = {
            text: "Equipo de Salud",
            active: true,
            color: 'color20',
            callback: function () {
                $location.path('/equipo-salud/');
            }
        }

    }
    loadMenu();
}
;
