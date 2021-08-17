"use strict";
/*global angular*/
angular.module('odiseo')
        .controller('PacienteController', PacienteController);
PacienteController['$inject'] = ['$scope', 'SpeechRecognitionAPI', 'PacienteService', '$routeParams', 'MenuService', '$location', '$route', '$mdDialog', '$window', '$timeout', 'CommonService'];

function PacienteController($scope, SpeechRecognitionAPI, PacienteService, $routeParams, MenuService, $location, $route, $mdDialog, $window, $timeout, CommonService) {
    var vm = this;

    vm.isSaved = $routeParams.id ? true : false;
    vm.id = $routeParams.id || null;
    vm.busy = false;
    vm.paciente = {};
    vm.menu = MenuService.menu;

    var applyOnResult = function () {
        $scope.$apply();
    }

    SpeechRecognitionAPI.addCallback('resultMatch', applyOnResult, vm);
    SpeechRecognitionAPI.addCommands({
        'documento (de) identidad *valor': changeDocumentoIdentidad,
        'tipo (de) documento :valor': changeTipoDocumento,
        'primer nombre *valor': changePrimerNombre,
        'segundo nombre *valor': changeSegundoNombre,
        'primer apellido *valor': changePrimerApellido,
        'segundo apellido *valor': changeSegundoApellido,
        'sexo :valor': changeSexo,
        'fecha (de) nacimiento *dia *mes *ano': changeFechaNacimiento,
        'estado civil *valor': changeEstadoCivil,
        'ocupación *valor': changeOcupacion,
        'Entidad *valor': changeEPS,
        'tipo (de) afiliación *valor': changeTipoAfiliacion,
        'direccion (de) (residencia) *valor': changeDireccionResidencia,
        'barrio (de) (residencia) *valor': changeBarrioResidencia,
        'ciudad (de) (residencia) *valor': changeCiudadResidencia,
        'responsable *valor': changeResponsableNombre,
        'parentesco (del) responsable *valor': changeResponsableParentesco,
        'teléfono (del) responsable *valor': changeResponsableTelefono,
        'guardar': save
    }, 'form')

    function changeDocumentoIdentidad(valor) {
        vm.paciente.DocumentoIdentidad = valor;
    }

    function changeTipoDocumento(valor) {
        vm.paciente.TipoDocumento = valor;
    }

    function changePrimerNombre(valor) {
        vm.paciente.PrimerNombre = valor;
    }

    function changeSegundoNombre(valor) {
        vm.paciente.SegundoNombre = valor;
    }

    function changePrimerApellido(valor) {
        vm.paciente.PrimerApellido = valor;
    }

    function changeSegundoApellido(valor) {
        vm.paciente.SegundoApellido = valor;
    }

    function changeSexo(valor) {
        vm.paciente.Sexo = valor;
    }

    function changeFechaNacimiento(dia, mes, año) {
        vm.paciente.FechaNacimiento = new Date(año, mes, dia);
    }

    function changeEstadoCivil(valor) {
        vm.paciente.EstadoCivil = valor;
    }

    function changeOcupacion(valor) {
        vm.paciente.Ocupacion = valor;
    }

    function changeEPS(valor) {
        vm.paciente.EPS = valor;
    }

    function changeTipoAfiliacion(valor) {
        vm.paciente.TipoAfiliacion = valor;
    }

    function changeDireccionResidencia(valor) {
        vm.paciente.DireccionResidencia = valor;
    }

    function changeBarrioResidencia(valor) {
        vm.paciente.BarrioResidencia = valor;
    }

    function changeCiudadResidencia(valor) {
        vm.paciente.CiudadResidencia = valor;
    }

    function changeResponsableNombre(valor) {
        vm.paciente.ResponsableNombre = valor;
    }

    function changeResponsableParentesco(valor) {
        vm.paciente.ResponsableParentesco = valor;
    }

    function changeResponsableTelefono(valor) {
        vm.paciente.ResponsableTelefono = valor;
    }

    function autoSave() {
        save();
    }

    function onDataResult() {
        vm.busy = false;
        vm.pacienteForm.$setPristine();
        loadMenu();
    }
    function onDataFailed(response) {
        vm.busy = false;
        if (CommonService.serverStatus == 'internet') {
            $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('No hay conexion a internet')
                    .textContent('')
                    .ok('ok')
                    );
        } else {
            $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Error en el servidor')
                    .textContent('Lo sentimos ha ocurrido un error')
                    .ok('ok')
                    );
        }


    }

    function save() {
        if (!vm.busy) {
            if (vm.pacienteForm.$error.required) {
                $mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Validando...')
                        .textContent('Aun falta informacion necesaria.')
                        .ok('ok')
                        );
                return;
            }

            if (!vm.pacienteForm.$valid) {
                $mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Validando...')
                        .textContent('Creo que no has ingresado informacion correcta.')
                        .ok('ok')
                        );

                return;
            }
           
            vm.busy = true;
            if (vm.isSaved) {
                PacienteService.updatePaciente().then(function (response) {

                    onDataResult();
                }, function (response) {

                });
            } else {
                
                PacienteService.createPaciente(vm.paciente).then(function (response) {
                    vm.isSaved = true;
                    vm.paciente = PacienteService.paciente;
                    vm.paciente.FechaNacimiento = new Date(vm.paciente.FechaNacimiento);
                    onDataResult();
                }, function (response) {

                });
            }
        }
    }


    function search() {
        if (!vm.busy) {
            vm.busy = true;
            PacienteService.searchPaciente(vm.paciente).then(function (response) {
                if (PacienteService.paciente._id) {
                    vm.isSaved = true;
                    vm.paciente = PacienteService.paciente;
                    vm.paciente.FechaNacimiento = new Date(vm.paciente.FechaNacimiento);
                }
                onDataResult();
            }, function (response) {
                onDataFailed(response);
            });
        }
    }

    vm.buscarPaciente = search;

    $scope.$watch(
            function watch(scope) {
                return (vm.paciente);
            },
            function onChangePaciente() {
                loadMenu();

                vm.paciente.PrimerNombre ? vm.paciente.PrimerNombre = primeraMayuscula(vm.paciente.PrimerNombre) : null;
                vm.paciente.SegundoNombre ? vm.paciente.SegundoNombre = primeraMayuscula(vm.paciente.SegundoNombre) : null;
                vm.paciente.PrimerApellido ? vm.paciente.PrimerApellido = primeraMayuscula(vm.paciente.PrimerApellido) : null;
                vm.paciente.SegundoApellido ? vm.paciente.SegundoApellido = primeraMayuscula(vm.paciente.SegundoApellido) : null;

            }, true);

    function primeraMayuscula(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    if (vm.isSaved) {
        PacienteService.getPaciente(vm.id).then(function () {
            vm.paciente = PacienteService.paciente;
            vm.paciente.FechaNacimiento = new Date(vm.paciente.FechaNacimiento);
            onDataResult();
        }, function () {

        });
    }

    vm.openNewTab = function () {
        $window.open('/#/paciente/', '_blank');
    }
}

angular.module('odiseo').directive('onEnterPressed', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.onEnterPressed);
                });
                event.preventDefault();
            }
        });
    };
}
);