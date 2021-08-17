 'use strict';
 (function () {
    angular
    .module('odiseo')
    .service('EvolucionService', EvolucionService);
    EvolucionService["$inject"] = ['$resource', '$q', '$http', '$sce'];
    function EvolucionService($resource, $q, $http, $sce) {
        var _this = this;
        _this.getEvolucion = function (idPaciente) {
            return $http.get('api/pacientes/' + idPaciente + '/evolucion').then(
                 function(response) {
                     if (typeof response.data === 'object') {
                         return $q.resolve(response.data);
                     }
                     else {
                         return $q.reject(response.data);
                     }
                 },
                 function(response) {
                     return $q.reject(response.data);
                 }
             );
        };
        _this.createEvolucionRow = function (row) {
            return $http.post('api/pacientes/' + row.IdPaciente + '/evolucion', row).then(
                 function(response) {
                     if (typeof response.data === 'object') {
                         return $q.resolve(response.data);
                     }
                     else {
                         return $q.reject(response.data);
                     }
                 },
                 function(response) {
                     return $q.reject(response.data);
                 }
             );
        };
        
    }
})();
