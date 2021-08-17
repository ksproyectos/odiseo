'use strict';
(function () {
    angular
            .module('odiseo')
            .service('PagosService', PagosService);
    PagosService["$inject"] = ['$q', '$http', '$sce'];
    function PagosService($q, $http, $sce) {
        var _this = this;

        _this.getPagos = function (idPaciente) {
            return $http.get('api/paciente/'+ idPaciente + '/pagos/').then(
                    function (response) {
                        if (typeof response.data === 'object') {
                            return $q.resolve(response.data);
                        } else {
                            return $q.reject(response.data);
                        }
                    },
                    function (response) {
                        return $q.reject(response.data);
                    }
            );
        };

        _this.getPago = function (id) {
            return $http.get('api/pagos/' + id).then(
                    function (response) {
                        if (typeof response.data === 'object') {
                            return $q.resolve(response.data);
                        } else {
                            return $q.reject(response.data);
                        }
                    },
                    function (response) {
                        return $q.reject(response.data);
                    }
            );
        };

        _this.postPago= function (idPaciente, data) {
            return $http.post('api/paciente/'+ idPaciente + '/pagos/', data).then(
                    function (response) {
                        if (typeof response.data === 'object') {
                            return $q.resolve(response.data);
                        } else {
                            return $q.reject(response.data);
                        }
                    },
                    function (response) {
                        return $q.reject(response.data);
                    }
            );
        };
        _this.putPago = function (id, data) {
            return $http.put('api/pagos/' + id, data).then(
                    function (response) {
                        if (typeof response.data === 'object') {
                            return $q.resolve(response.data);
                        } else {
                            return $q.reject(response.data);
                        }
                    },
                    function (response) {
                        return $q.reject(response.data);
                    }
            );
        };
        _this.deletePago = function (id) {
            return $http.delete('api/pagos/' + id).then(
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


