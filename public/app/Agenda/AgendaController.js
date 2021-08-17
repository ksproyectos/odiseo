"use strict";
/*global angular*/
angular.module('odiseo')
        .controller('AgendaController', AgendaController);
AgendaController['$inject'] = ['$scope', 'SpeechRecognitionAPI', 'DocumentoGeneralService', '$routeParams', 'PacienteService', 'MenuService', '$location', '$route', '$mdDialog', '$window', 'EquipoSaludService'];

function AgendaController($scope, SpeechRecognitionAPI, DocumentoGeneralService, $routeParams, PacienteService, MenuService, $location, $route, $mdDialog, $window, EquipoSaludService) {
    var vm = this;
    vm.paciente = PacienteService.paciente;
    vm.idPaciente = $route.current.params.idPaciente;
    vm.menu = MenuService.menu;
    vm.openNewAgenda = function () {
         $location.path('/paciente/agenda');
    }
    if (vm.idPaciente) {
         vm.busy = true;
        PacienteService.getPaciente(vm.idPaciente).then(function () {
            vm.paciente = PacienteService.paciente;
            onDataResult();
        });
    }
    function onDataResult(){
        vm.busy = false;
        loadMenu();
    }
    EquipoSaludService.getEquipoSalud().then(function (result) {
        if (result) {
            var equipoSalud = [];
            angular.forEach(result, function (value, key) {
                equipoSalud.push({key: value._id, label: value.NombreCompleto})
            });

            createScheduler(equipoSalud);

        } else {

        }
    });

    function createScheduler(equipoSalud) {

        if (!scheduler.isConfig) {
            scheduler.isConfig = true;
            scheduler.filter_agenda = function (id, event) {
                if (event.IdPaciente._id == PacienteService.paciente._id)
                    return true;
            };
            //Funcion para editar el titulo del evento
            scheduler.templates.event_text = function (start, end, ev) {
                return ev.text;
            };
            //Configuraciones
            //Nombre tab pacientes
            scheduler.locale.labels.agenda_tab = "Paciente";
            
            scheduler.config.first_hour = 6;
            scheduler.config.last_hour = 20;
            scheduler.config.multi_day = true;
            scheduler.config.details_on_create = true;
            scheduler.config.details_on_dblclick = true;
            scheduler.config.show_loading = true;
            
            scheduler.templates.time_picker = 
            scheduler.date.date_to_str("%g:%i %a");
            //Campos utilizados en la ventana de dialogo del calendario
            scheduler.config.lightbox.sections = [
                {name: "Descripcion", height: 130, map_to: "descripcion", type: "textarea", focus: true},
                {name: "Asignado", height: 23, type: "select", options: equipoSalud, map_to: "IdAsignado"},
                {name: "time", height: 72, type: "time", map_to: "auto", time_format:["%H:%i","%m","%d" ,"%Y"]},
                {name: "Paciente", height: 65, type: "template", map_to: "paciente_template"}
            ];

            scheduler.config.xml_date = "%Y-%m-%dT%H:%i:%s";            
            
            scheduler.attachEvent("onEventSave", function (id, ev) {
                var event = scheduler.getEvent(id);
                event.text = event.IdPaciente.PrimerNombre + " " + (event.IdPaciente.SegundoNombre ? event.IdPaciente.SegundoNombre : "") + " " + event.IdPaciente.PrimerApellido + " " + (event.IdPaciente.SegundoApellido ? event.IdPaciente.SegundoApellido : "") + " - " + event.IdPaciente.Telefono;
                event.IdPaciente = event.IdPaciente._id;
                return true;
            });
            scheduler.attachEvent("onEventCreated", function (id, e) {
                
                var ev = scheduler.getEvent(id);
                if (!PacienteService.paciente._id) {
                    scheduler.deleteEvent(id);
                    return false;
                }
                ev.paciente_template = "<b>Documento de Identidad:</b> " + PacienteService.paciente.DocumentoIdentidad + "<br>" +
                        "<b>Nombre Completo:</b> " + PacienteService.paciente.PrimerNombre + " " + (PacienteService.paciente.SegundoNombre ? PacienteService.paciente.SegundoNombre : "") + " " + PacienteService.paciente.PrimerApellido + " " + (PacienteService.paciente.SegundoApellido ? PacienteService.paciente.SegundoApellido : "") +  "<br>" +
                        "<b>Telefono:</b> " + PacienteService.paciente.Telefono;
                ev.IdPaciente = PacienteService.paciente;
                return true;
            });
            scheduler.attachEvent("onBeforeLightbox", function (id, e) {
                var ev = scheduler.getEvent(id);
                if (!PacienteService.paciente._id) {
                    return false;
                }
                ev.paciente_template = "<b>Documento de Identidad:</b> " + ev.IdPaciente.DocumentoIdentidad + "<br>" +
                        "<b>Nombre Completo:</b> " + ev.IdPaciente.PrimerNombre + " " + (ev.IdPaciente.SegundoNombre ? ev.IdPaciente.SegundoNombre : "") + " " + ev.IdPaciente.PrimerApellido + " " + (ev.IdPaciente.SegundoApellido ? ev.IdPaciente.SegundoApellido : "")+ "<br>" +
                        "<b>Telefono:</b> " + ev.IdPaciente.Telefono;
                return true;
            });
            var dp = new dataProcessor("/api/agenda/");
            dp.init(scheduler);
            dp.setTransactionMode("REST");
            dp.attachEvent("onAfterUpdate", function (id, action, tid, response) {
                if (action == 'deleted') {
                    return true;
                }
                var ev = scheduler.getEvent(id);
                ev.IdPaciente = response.IdPaciente;
                scheduler.setEvent(id, ev);
                return true;
            });
            scheduler.setLoadMode("month");
        }
        scheduler.init('scheduler', new Date(), "day");
        scheduler.load("/api/agenda", 'json');
    }
}