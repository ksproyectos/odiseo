"use strict";
angular.module('odiseo')
        .controller('PagosController', PagosController);
PagosController['$inject'] = ['$scope', '$location', 'PagosService', 'MenuService', 'PacienteService', '$route', '$routeParams', 'TratamientosService'];
function PagosController($scope, $location, PagosService, MenuService, PacienteService, $route, $routeParams, TratamientosService) {
    var vm = this;
    vm.title = "Pagos";
    vm.items = null;
    vm.error = false;
    vm.limit = 10;
    vm.page = 1;
    vm.selected = [];
    vm.paciente = PacienteService.paciente;
    vm.idPaciente = $routeParams.idPaciente || false;
    vm.menu = MenuService.menu;
    vm.edit = function (id) {
        if (vm.idPaciente) {
            $location.path('/paciente/' + vm.idPaciente + '/pagos/' + id);
        } else {
            $location.path('/pagos/' + id);
        }
    };

    vm.add = function () {
        if (vm.idPaciente) {
            $location.path('/paciente/' + vm.idPaciente + '/pagos/new');
        } else {
            $location.path('/pagos/new');
        }

    };
    vm.delete = function (id) {
        PagosService.deletePago(id).then(function (result) {
            onDataResult();
            vm.getAllPagos();
        });
    };
    
    vm.print = function (id) {
        var iframe = $('<iframe id="pdf">').hide().appendTo("body");
        iframe.attr('src', '/api/pdf/' + id);
        iframe.on('load', function(){
            iframe[0].contentWindow.print();
        });
    }
    vm.getAllPagos = function () {
        console.log(vm.idPaciente);
        PagosService.getPagos(vm.idPaciente).then(
                function (response) {
                    vm.items = response;
                },
                function (response) {
                    console.log(response);
                    vm.error = true;
                }
        );
    }
    vm.getAllPagos();


    TratamientosService.getTratamientos().then(
            function (response) {
                vm.tratamientos = response;
            },
            function (response) {
                console.log(response);
                vm.error = true;
            }
    );

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
