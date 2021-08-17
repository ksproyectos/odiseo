'use strict';
(function() {
    angular
        .module('odiseo')
        .service('RIPSService', RIPSService);
    RIPSService["$inject"] = ['$resource', '$q', '$http', '$sce'];

    function RIPSService($resource, $q, $http, $sce) {
        var _this = this;

        _this.createConsultaRIPS = function(IdPaciente, consultaRIPS) {
            return $http.post('api/pacientes/' + IdPaciente + '/RIPS/consultas', consultaRIPS).then(
                function(response) {
                    return $q.resolve(response.data);
                },
                function(response) {
                    return $q.reject(response.data);
                }
            );
        };
        _this.createProcedimientoRIPS = function(IdPaciente, consultaRIPS) {
            return $http.post('api/pacientes/' + IdPaciente + '/RIPS/procedimientos', consultaRIPS).then(
                function(response) {
                    return $q.resolve(response.data);
                },
                function(response) {
                    return $q.reject(response.data);
                }
            );
        };
    }
})();