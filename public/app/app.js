angular.module('odiseo', [
    'ngRoute',
    'ngResource',
    'ngAnimate',
    'ngMaterial',
    'ngMessages',
    'md.data.table',
    'monospaced.elastic'

])
        .config(['$httpProvider', function ($httpProvider) {
                $httpProvider.interceptors.push('httpResponseInterceptor');
            }])
        .service('httpResponseInterceptor', ['$q', 'CommonService', function ($q, CommonService) {
                this.response = function (response) {
                    return response || $q.when(response);
                };
                this.responseError = function (response) {
                    if (response.status === -1) {
                        CommonService.serverStatus = "internet"
                    }
                    return $q.reject(response);
                };
            }])
        .run(function (EquipoSaludService, CommonService) {

            EquipoSaludService.getEquipoSalud().then(function (response) {
                CommonService.autores.selectedProfesional = response[0];
                CommonService.autores.profesionales = response;
            })
        })
