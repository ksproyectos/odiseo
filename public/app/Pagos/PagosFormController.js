"use strict";
angular.module('odiseo')
        .controller('PagosFormController', PagosFormController);
PagosFormController['$inject'] = ['$scope', '$routeParams', '$location', '$filter', 'PagosService', '$mdDialog', '$mdToast', 'PacienteService', 'MenuService', '$route', '$mdMedia', 'TratamientosService'];
function PagosFormController($scope, $routeParams, $location, $filter, PagosService, $mdDialog, $mdToast, PacienteService, MenuService, $route, $mdMedia, TratamientosService) {
    var vm = this;
    vm.isEdit = $routeParams.id ? true : false;
    vm.title = $routeParams.id ? 'Actualizar Pago' : 'Crear Pago';
    vm.btnTxt = $routeParams.id ? 'Actualizar' : 'Crear';
    vm.pago = null;
    vm.id = $routeParams.id || null;
    vm.busy = true;
    vm.error = false;
    vm.selected = [];
    vm.paciente = PacienteService.paciente;
    vm.idPaciente = $routeParams.idPaciente || false;
    vm.menu = MenuService.menu;
    
    if (vm.isEdit) {
        PagosService.getPago(vm.id).then(
                function (response) {
                    vm.pago = response;
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
        vm.pago = {};
        vm.pago.Tratamientos = [];
    }

    vm.submitForm = function () {
        vm.busy = true;
        if (vm.isEdit) {
            PagosService.putPago(vm.id, vm.pago).then(
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
            PagosService.postPago(vm.idPaciente, vm.pago).then(
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
            if (vm.idPaciente) {
                $location.path('/paciente/' + vm.idPaciente + '/pagos');
            } else {
                $location.path('/pagos');
            }
        }
    }
    vm.cancel = function () {
        if (vm.idPaciente) {
            $location.path('/paciente/' + vm.idPaciente + '/pagos');
        } else {
            $location.path('/pagos');
        }
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

    vm.showAgregarTratamientoDialog = showAgregarTratamientoDialog;
    vm.eliminarTratamiento = eliminarTratamiento;

    function showAgregarTratamientoDialog(ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: 'agregarTratamientoDialogController',
            controllerAs: 'ctrl',
            templateUrl: 'agregarTratamientoDialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen
        })
                .then(function (row) {
                    vm.pago.Tratamientos.push(row);
                    calcularTotal()
                }, function () {

                });
        $scope.$watch(function () {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function (wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    }

    function eliminarTratamiento() {
        angular.forEach(vm.pago.Tratamientos, function (value, key) {
            vm.pago.Tratamientos = $filter('filter')(vm.pago.Tratamientos, {$$hashKey: "!" + value.$$hashKey});
        });

    }
    function calcularTotal(){
        vm.pago.Valor = 0;
        angular.forEach(vm.pago.Tratamientos, function (value, key) {
            vm.pago.Valor += value.Valor;
        });
    }
}
angular.module('odiseo')
        .controller('agregarTratamientoDialogController', function ($scope, $mdDialog, PresupuestoService, PacienteService) {
            var vm = this;
            vm.options = {};
            vm.selectedTratamiento = {};

            PresupuestoService.getPresupuesto(PacienteService.paciente._id).then(
                    function (response) {
                        vm.options.presupuesto = response;
                    },
                    function (response) {
                        console.log(response);
                    }
            );

            vm.calcularSubtotal = function () {
                var totalDientes = 0;
                angular.forEach(vm.Dientes, function (value, key) {
                    if (value) {
                        totalDientes++;
                    }
                });
                if (totalDientes == 0) {
                    vm.Valor = vm.selectedTratamiento.Valor;
                } else {
                    vm.Valor = vm.selectedTratamiento.Valor * totalDientes;
                }
            }

            vm.hide = function () {
                $mdDialog.hide();
            };
            vm.cancel = function () {
                $mdDialog.cancel();
            };
            vm.agregar = function () {
                var row = {
                    IdTratamiento: vm.selectedTratamiento.IdTratamiento,
                    Dientes: vm.Dientes,
                    Valor: vm.Valor
                };
                $mdDialog.hide(row);
            };
        }
        );
