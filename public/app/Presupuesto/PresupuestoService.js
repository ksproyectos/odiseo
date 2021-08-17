 'use strict';
 (function () {
    angular
    .module('odiseo')
    .service('PresupuestoService', PresupuestoService);
    PresupuestoService["$inject"] = ['$resource', '$q', '$http', '$sce'];
    function PresupuestoService($resource, $q, $http, $sce) {
        var _this = this;
        _this.getPresupuesto = function (idPaciente) {
            return $http.get('api/pacientes/' + idPaciente + '/presupuesto').then(
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
        _this.postTratamiento = function (row) {
            return $http.post('api/pacientes/' + row.IdPaciente + '/presupuesto', row).then(
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
        
       _this.deleteTratamiento = function (id) {
            return $http.delete('api/presupuesto/' + id).then(
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
