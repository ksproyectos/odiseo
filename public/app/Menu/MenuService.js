'use strict';
angular.module('odiseo').service('MenuService', function ($location) {

    this.menu = {
        options: []
    };

    this.onOptionChangeEventListeners = [];

    this.addOnOptionChangeEventListener = function(callback){
        this.onOptionChangeEventListeners.push(callback);
    }

    this.setOptions= function(options){
        this.menu.options = options;
        this.onOptionChangeEventListeners.forEach(callback => {
            callback();
        });
    }

    this.setSaveCallback = function(saveCallback){
        this.saveCallback = saveCallback
    }

    this.setIsSaved= function(isSaved){
        this.isSaved = isSaved;
    }

    var isSaved = function(){
        return true;
    };

    var saveCallback = function(){

    }

    this.setMenu = function(idPaciente, module){

        if( typeof idPaciente == 'undefined'){
            idPaciente = null;
        }
       var options = [];

       if(module == "paciente"){
            options.push({
                text: "Buscar",
                active: (isSaved()),
                color: 'color5',
                callback: function () {
                    search();
                }
            })
       }

       if(module == "odontograma"){
            options.push({
                text: "Ver Odontograma Inicial",
                active: (isSaved()),
                color: 'color5',
                callback: function () {
                    $location.path('/paciente/' + idPaciente+ '/odontograma/inicial');
                }
            })
            options.push({
                text: "Ver Odontograma Evolucion",
                active: (isSaved()),
                color: 'color12',
                callback: function () {
                    $location.path('/paciente/' + idPaciente+ '/odontograma/');
                }
            })
       }
        
        options.push({
            text: "Guardar",
            active: (!isSaved()),
            color: 'color12',
            callback: saveCallback
        })
        options.push({
            text: "Cancelar",
            active: (!isSaved()),
            color: 'color1',
            callback: function () {
                $route.reload();
            }
        })

        options.push({
            text: "Crear o Buscar Paciente",
            active: (isSaved()),
            color: 'color9',
            callback: function () {
                $location.path('/paciente/');
            }
        })

        options.push({
            text: "Datos personales",
            active: (idPaciente && isSaved()),
            color: 'color18',
            callback: function () {
                $location.path('/paciente/' + idPaciente);
            }
        })
        options.push({
            text: "Informacion clinica",
            active: (idPaciente && isSaved()),
            color: 'color18',
            callback: function () {
                $location.path('/paciente/' + idPaciente+ '/documento-general/');
            }
        })
        if(module != "odontograma"){

            options.push({
                text: "Odontograma",
                active: (idPaciente && isSaved()),
                color: 'color12',
                callback: function () {
                    $location.path('/paciente/' + idPaciente+ '/odontograma/');
                }
            })
        }
        
        options.push({
            text: "Evolucion",
            active: (idPaciente && isSaved()),
            color: 'color18',
            callback: function () {
                $location.path('/paciente/' + idPaciente+ '/evolucion/');
            }
        })
        options.push({
            text: "Agenda",
            active: (isSaved()),
            color: 'color7',
            callback: function () {
                if (idPaciente) {
                    $location.path('/paciente/' + idPaciente+ '/agenda/');
                } else {
                    $location.path('/agenda');
                }
            }
        })
        options.push({
            text: "Presupuesto",
            active: (idPaciente && isSaved()),
            color: 'color14',
            callback: function () {
                $location.path('/paciente/' + idPaciente + '/presupuesto/');
            }
        })
        options.push({
            text: "Pagos",
            active: (idPaciente && isSaved()),
            color: 'color14',
            callback: function () {
                $location.path('/paciente/' + idPaciente + '/pagos/');
            }
        });
        options.push({
            text: "Tratamientos",
            active: (isSaved()),
            color: 'color20',
            callback: function () {
                $location.path('/tratamientos/');
            }
        })
        options.push({
            text: "Equipo de Salud",
            active: (isSaved()),
            color: 'color20',
            callback: function () {
                $location.path('/equipo-salud/');
            }
        });

        this.setOptions(options);
    }
    
});