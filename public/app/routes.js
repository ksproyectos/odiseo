angular.module('odiseo').config(function($routeProvider) {
        $routeProvider
                .when('/', {
                    templateUrl: 'app/Pacientes/PacientesView.html',
                    controller: 'PacienteController',
                    controllerAs: "PacienteCtrl",
                    resolve: {
                        menu:['$route', 'MenuService', function($route, MenuService) {
                            MenuService.setMenu($route.current.params.idPaciente, "paciente");
                        }] 
                    }
                })
                .when('/paciente', {
                    templateUrl: 'app/Pacientes/PacientesView.html',
                    controller: 'PacienteController',
                    controllerAs: "PacienteCtrl",
                    resolve: {
                        menu:['$route', 'MenuService', function($route, MenuService) {
                            MenuService.setMenu($route.current.params.idPaciente, "paciente");
                        }] 
                    }
                })
                .when('/paciente/agenda', {
                    templateUrl: 'app/Pacientes/PacienteAgendaView.html',
                    controller: 'PacienteController',
                    controllerAs: "PacienteCtrl",
                    resolve: {
                        menu:['$route', 'MenuService', function($route, MenuService) {
                            MenuService.setMenu($route.current.params.idPaciente, "paciente");
                        }] 
                    }
                })
                .when('/paciente/:id', {
                    templateUrl: 'app/Pacientes/PacientesView.html',
                    controller: 'PacienteController',
                    controllerAs: "PacienteCtrl",
                    resolve: {
                        menu:['$route', 'MenuService', function($route, MenuService) {
                            MenuService.setMenu($route.current.params.idPaciente, "paciente");
                        }] 
                    }
                })
                .when('/paciente/:idPaciente/documento-general', {
                    templateUrl: 'app/DocumentoGeneral/DocumentoGeneralView.html',
                    controller: 'DocumentoGeneralController',
                    controllerAs: "DocumentoGeneralCtrl",
                    resolve: {
                        menu:['$route', 'MenuService', function($route, MenuService) {
                            MenuService.setMenu($route.current.params.idPaciente, "documento");
                        }] 
                    }
                })
                .when('/paciente/:idPaciente/documento-general/:id', {
                    templateUrl: 'app/DocumentoGeneral/DocumentoGeneralView.html',
                    controller: 'DocumentoGeneralController',
                    controllerAs: "DocumentoGeneralCtrl",
                    resolve: {
                        menu:['$route', 'MenuService', function($route, MenuService) {
                            MenuService.setMenu($route.current.params.idPaciente, "documento");
                        }] 
                    }
                })
                .when('/paciente/:idPaciente/odontograma', {
                    templateUrl: 'app/Odontograma/OdontogramaView.html',
                    controller: 'OdontogramaController',
                    controllerAs: "OdontogramaCtrl",
                    resolve: {
                        menu:['$route', 'MenuService', function($route, MenuService) {
                            MenuService.setMenu($route.current.params.idPaciente, "odontograma");
                        }] 
                    }
                })
                .when('/paciente/:idPaciente/odontograma/:mode', {
                    templateUrl: 'app/Odontograma/OdontogramaView.html',
                    controller: 'OdontogramaController',
                    controllerAs: "OdontogramaCtrl",
                    resolve: {
                        menu:['$route', 'MenuService', function($route, MenuService) {
                            MenuService.setMenu($route.current.params.idPaciente, "odontograma");
                        }] 
                    }
                })
                .when('/paciente/:idPaciente/evolucion', {
                    templateUrl: 'app/Evolucion/EvolucionView.html',
                    controller: 'EvolucionController',
                    controllerAs: "EvolucionCtrl",
                    resolve: {
                        menu:['$route', 'MenuService', function($route, MenuService) {
                            MenuService.setMenu($route.current.params.idPaciente, "evolucion");
                        }] 
                    }
                })
                .when('/paciente/:idPaciente/agenda', {
                    templateUrl: 'app/Agenda/AgendaView.html',
                    controller: 'AgendaController',
                    controllerAs: "AgendaCtrl",
                    resolve: {
                        menu:['$route', 'MenuService', function($route, MenuService) {
                            MenuService.setMenu($route.current.params.idPaciente, "agenda");
                        }] 
                    }
                })
                .when('/agenda', {
                    templateUrl: 'app/Agenda/AgendaView.html',
                    controller: 'AgendaController',
                    controllerAs: "AgendaCtrl",
                    resolve: {
                        menu:['$route', 'MenuService', function($route, MenuService) {
                            MenuService.setMenu($route.current.params.idPaciente, "agenda");
                        }] 
                    }
                })
                .when('/equipo-salud', {
                    templateUrl: 'app/EquipoSalud/EquipoSaludView.html',
                    controller: 'EquipoSaludController',
                    controllerAs: "EquipoSaludCtrl",
                    resolve: {
                        menu:['$route', 'MenuService', function($route, MenuService) {
                            MenuService.setMenu($route.current.params.idPaciente, "equipo");
                        }] 
                    }
                })
                .when('/equipo-salud/new', {
                    templateUrl: 'app/EquipoSalud/_form.html',
                    controller: 'EquipoSaludFormController',
                    controllerAs: "EquipoSaludForm",
                    resolve: {
                        menu:['$route', 'MenuService', function($route, MenuService) {
                            MenuService.setMenu($route.current.params.idPaciente, "equipo");
                        }] 
                    }
                })
                .when('/equipo-salud/:id', {
                    templateUrl: 'app/EquipoSalud/_form.html',
                    controller: 'EquipoSaludFormController',
                    controllerAs: "EquipoSaludForm",
                    resolve: {
                        menu:['$route', 'MenuService', function($route, MenuService) {
                            MenuService.setMenu($route.current.params.idPaciente, "equipo");
                        }] 
                    }
                })
                .when('/tratamientos', {
                    templateUrl: 'app/Tratamientos/TratamientosView.html',
                    controller: 'TratamientosController',
                    controllerAs: "TratamientosCtrl",
                    resolve: {
                        menu:['$route', 'MenuService', function($route, MenuService) {
                            MenuService.setMenu($route.current.params.idPaciente, "tratamientos");
                        }] 
                    }
                })
                .when('/tratamientos/new', {
                    templateUrl: 'app/Tratamientos/_form.html',
                    controller: 'TratamientosFormController',
                    controllerAs: "TratamientosForm",
                    resolve: {
                        menu:['$route', 'MenuService', function($route, MenuService) {
                            MenuService.setMenu($route.current.params.idPaciente, "tratamientos");
                        }] 
                    }
                })
                .when('/tratamientos/:id', {
                    templateUrl: 'app/Tratamientos/_form.html',
                    controller: 'TratamientosFormController',
                    controllerAs: "TratamientosForm"
                    ,resolve: {
                        menu:['$route', 'MenuService', function($route, MenuService) {
                            MenuService.setMenu($route.current.params.idPaciente, "tratamientos");
                        }] 
                    }
                })
                .when('/paciente/:idPaciente/pagos', {
                    templateUrl: 'app/Pagos/PagosView.html',
                    controller: 'PagosController',
                    controllerAs: "PagosCtrl"
                    ,resolve: {
                        menu:['$route', 'MenuService', function($route, MenuService) {
                            MenuService.setMenu($route.current.params.idPaciente, "pagos");
                        }] 
                    }
                })
                .when('/paciente/:idPaciente/pagos/new', {
                    templateUrl: 'app/Pagos/_form.html',
                    controller: 'PagosFormController',
                    controllerAs: "PagosForm"
                    ,resolve: {
                        menu:['$route', 'MenuService', function($route, MenuService) {
                            MenuService.setMenu($route.current.params.idPaciente, "pagos");
                        }] 
                    }
                })
                .when('/paciente/:idPaciente/pagos/:id', {
                    templateUrl: 'app/Pagos/_form.html',
                    controller: 'PagosFormController',
                    controllerAs: "PagosForm"
                    ,resolve: {
                        menu:['$route', 'MenuService', function($route, MenuService) {
                            MenuService.setMenu($route.current.params.idPaciente, "pagos");
                        }] 
                    }
                })
                .when('/paciente/:idPaciente/presupuesto', {
                    templateUrl: 'app/Presupuesto/PresupuestoView.html',
                    controller: 'PresupuestoController',
                    controllerAs: "PresupuestoCtrl"
                    ,resolve: {
                        menu:['$route', 'MenuService', function($route, MenuService) {
                            MenuService.setMenu($route.current.params.idPaciente, "presupuesto");
                        }] 
                    }
                })
                .when('/paciente/:idPaciente/presupuesto/new', {
                    templateUrl: 'app/Presupuesto/_form.html',
                    controller: 'PresupuestoFormController',
                    controllerAs: "PresupuestoForm"
                    ,resolve: {
                        menu:['$route', 'MenuService', function($route, MenuService) {
                            MenuService.setMenu($route.current.params.idPaciente, "presupuesto");
                        }] 
                    }
                })
                .when('/paciente/:idPaciente/presupuesto/id', {
                    templateUrl: 'app/Presupuesto/_form.html',
                    controller: 'PresupuestoFormController',
                    controllerAs: "PresupuestoForm"
                    ,resolve: {
                        menu:['$route', 'MenuService', function($route, MenuService) {
                            MenuService.setMenu($route.current.params.idPaciente, "presupuesto");
                        }] 
                    }
                })
                
    });