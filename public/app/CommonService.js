 'use strict';
 (function () {
    angular
    .module('odiseo')
    .service('CommonService', CommonService);
    CommonService["$inject"] = [];
    function CommonService() {
        var _this = this;
        _this.serverStatus;
        
        _this.autores = {
            selectedProfesional: {},
            profesionales: {}
        };
    }
})();
