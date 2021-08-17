'use strict';
(function () {
    angular
            .module('odiseo')
            .service('EquipoSaludService', EquipoSaludService);
    EquipoSaludService["$inject"] = ['$q', '$http', '$sce'];
    function EquipoSaludService($q, $http, $sce) {
        var _this = this;

        _this.getEquipoSalud = function (idPaciente) {
            return $http.get('api/equipo-salud/').then(
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

        _this.getProfesional = function (id) {
            return $http.get('api/equipo-salud/' + id).then(
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

        _this.postProfesional= function (data) {
            return $http.post('api/equipo-salud/', data).then(
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
        _this.putProfesional = function (id, data) {
            return $http.put('api/equipo-salud/' + id, data).then(
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
    }
})();


