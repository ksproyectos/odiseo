'use strict';
(function () {
    angular
            .module('odiseo')
            .service('PacienteService', PacienteService);
    PacienteService["$inject"] = ['$resource', '$q', '$http', '$sce'];
    function PacienteService($resource, $q, $http, $sce) {
        var _this = this;
        var PacienteResource = $resource('api/pacientes/:id', {id: '@_id'}, {
            find: {method: 'POST', url: 'api/pacientes/find/object'}
        });

        _this.paciente = {};

        _this.getPaciente = function (id) {
            _this.paciente = PacienteResource
                    .get({id: id});
            return _this.paciente.$promise;
        };
        _this.updatePaciente = function () {
            _this.paciente.$save();
            return _this.paciente.$promise;
        };
        _this.createPaciente = function (paciente) {
            _this.paciente = PacienteResource
                    .save(paciente);
            return _this.paciente.$promise;
        };
        _this.deletePaciente = function () {
            _this.paciente.$remove();
            return _this.paciente.$promise;
        };

        _this.searchPaciente = function (paciente) {
            _this.paciente = PacienteResource
                    .find(paciente);
            return _this.paciente.$promise;
        };

    }
})();
