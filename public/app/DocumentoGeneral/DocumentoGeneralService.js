 'use strict';
 (function() {
     angular
         .module('odiseo')
         .service('DocumentoGeneralService', DocumentoGeneralService);
     DocumentoGeneralService["$inject"] = ['$resource', '$q', '$http', '$sce'];

     function DocumentoGeneralService($resource, $q, $http, $sce) {
         var _this = this;

         _this.documentoGeneral = {};

         _this.getDocumentoGeneral = function(id) {
             return $http.post('api/documento-general/' + id).then(
                 function(response) {
                     if (typeof response.data === 'object') {
                         _this.documentoGeneral = response.data;
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
         _this.createDocumentoGeneral = function(documentoGeneral) {
             return $http.post('api/pacientes/' + documentoGeneral.IdPaciente + '/documento-general', documentoGeneral).then(
                 function(response) {
                     if (typeof response.data === 'object') {
                         _this.documentoGeneral = response.data;
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

         _this.getDocumentoGeneralByIdPaciente = function(idPaciente) {
             return $http.get('api/pacientes/' + idPaciente + '/documento-general').then(
                 function(response) {
                     if (typeof response.data === 'object') {
                         _this.documentoGeneral = response.data;
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
 