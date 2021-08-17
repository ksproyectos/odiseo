'use strict';
(function () {
    angular
            .module('odiseo')
            .service('TratamientosService', TratamientosService);
    TratamientosService["$inject"] = ['$q', '$http', '$sce'];
    function TratamientosService($q, $http, $sce) {
        var _this = this;

        _this.getTratamientos = function (idPaciente) {
            return $http.get('api/tratamientos/').then(
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

        _this.getTratamiento = function (id) {
            return $http.get('api/tratamientos/' + id).then(
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

        _this.postTratamiento= function (data) {
            return $http.post('api/tratamientos/', data).then(
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
        _this.putTratamiento = function (id, data) {
            return $http.put('api/tratamientos/' + id, data).then(
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
        _this.deleteTratamiento = function (id) {
            return $http.delete('api/tratamientos/' + id).then(
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


