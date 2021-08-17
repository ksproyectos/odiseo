 'use strict';
 (function() {
     angular
         .module('odiseo')
         .service('OdontogramaService', OdontogramaService);
     OdontogramaService["$inject"] = ['$resource', '$q', '$http', '$sce'];

     function OdontogramaService($resource, $q, $http, $sce) {
         var _this = this;
         
         _this.odontograma = {};

         _this.getOdontograma = function(id) {
             return $http.get('api/odontograma/' + id).then(
                 function(response) {
                     if (typeof response.data === 'object') {
                         _this.odontograma = response.data;
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
         _this.createOdontograma = function(odontograma, tipo) {
             return $http.post('api/pacientes/' + odontograma.IdPaciente + '/odontograma/' + tipo, odontograma).then(
                 function(response) {
                     if (typeof response.data === 'object') {
                         _this.odontograma = response.data;
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
         _this.getOdontogramaByIdPaciente = function(idPaciente, tipo) {
             return $http.get('api/pacientes/' + idPaciente + '/odontograma/' + tipo).then(
                 function(response) {
                     if (typeof response.data === 'object') {
                         _this.odontograma = response.data;
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
         }
     }
 })();
 