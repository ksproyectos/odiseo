  "use strict";
  /*global angular*/
  angular.module('odiseo')
    .controller('DocumentoGeneralController', DocumentoGeneralController);
  DocumentoGeneralController['$inject'] = ['$scope', 'SpeechRecognitionAPI', 'DocumentoGeneralService', '$routeParams', 'PacienteService', 'MenuService', '$location', '$route', '$mdDialog', '$window', 'CommonService'];

  function DocumentoGeneralController($scope, SpeechRecognitionAPI, DocumentoGeneralService, $routeParams, PacienteService, MenuService, $location, $route, $mdDialog, $window, CommonService) {
    var vm = this;

    vm.isSaved = $routeParams.id ? true : false;
    vm.id = $routeParams.id || null;
    vm.idPaciente = $routeParams.idPaciente;
    vm.busy = false;
    vm.documentoGeneral = {};
    vm.autores = CommonService.autores;
    vm.paciente = PacienteService.paciente;
    vm.menu = MenuService.menu;
    
      PacienteService.getPaciente(vm.idPaciente).then(function() {
      vm.paciente = PacienteService.paciente;
      onDataResult();
    });

    var applyOnResult = function() {
      $scope.$apply();
    }

    SpeechRecognitionAPI.removeCommands('form');
    SpeechRecognitionAPI.addCallback('resultMatch', applyOnResult, vm);
    SpeechRecognitionAPI.addCommands({
      'motivo (de) consulta *valor': changeMotivoConsulta,
      'estado (de) salud :valor': changeEstadoSalud,
      'medicamento(s) *valor': changeMedicamentosActuales,
      ':valor está embarazada': changeEmbarazada,
      ':valor fuma': changeFuma,
      ':valor tiene alergias': changeAlergias,
      ':valor tiene cardiopatías': changeCardiopatias,
      ':valor tiene hipertensión': changeHipertension,
      ':valor tiene hepatitis': changeHepatitis,
      ':valor tiene fiebre reumática': changeFiebreReumatica,
      ':valor tiene hemorragias': changeHemorragias,
      ':valor tiene diabetes': changeDiabetes,
      'otros antecedentes *valor': changeOtrosAntecedentes,
      ':valor tiene hábitos': changeHabitos,
      'otros antecedentes odontologicos *valor': changeAntecedentesOdontologicos,
      'examen estomatológico *valor': changeExamenEstomatologico,
      'accidente(s) *valor': changeAccidentes,
      'tejidos blandos *valor': changeTegidosBlandos,
      'guardar': save
    }, 'form');


    function changeMotivoConsulta(valor) {
      vm.documentoGeneral.MotivoConsulta = valor;
    }

    function changeEstadoSalud(valor) {
      vm.documentoGeneral.EstadoSalud = valor;
    }

    function changeMedicamentosActuales(valor) {
      vm.documentoGeneral.MedicamentosActuales = valor;
    }

    function changeEmbarazada(valor) {
      vm.documentoGeneral.Embarazada = valor;
    }

    function changeFuma(valor) {
      vm.documentoGeneral.Fuma = valor;
    }

    function changeAlergias(valor) {
      vm.documentoGeneral.Alergias = valor;
    }

    function changeCardiopatias(valor) {
      vm.documentoGeneral.Cardiopatias = valor;
    }

    function changeHipertension(valor) {
      vm.documentoGeneral.Hipertension = valor;
    }

    function changeHepatitis(valor) {
      vm.documentoGeneral.Hepatitis = valor;
    }

    function changeFiebreReumatica(valor) {
      vm.documentoGeneral.FiebreReumatica = valor;
    }

    function changeHemorragias(valor) {
      vm.documentoGeneral.Hemorragias = valor;
    }

    function changeDiabetes(valor) {
      vm.documentoGeneral.Diabetes = valor;
    }

    function changeOtrosAntecedentes(valor) {
      vm.documentoGeneral.OtrosAntecedentes = valor;
    }

    function changeHabitos(valor) {
      vm.documentoGeneral.Habitos = valor;
    }

    function changeAntecedentesOdontologicos(valor) {
      vm.documentoGeneral.OtrosAntecedentesOdontologicos = valor;
    }

    function changeExamenEstomatologico(valor) {
      vm.documentoGeneral.ExamenEstomatologico = valor;
    }

    function changeAccidentes(valor) {
      vm.documentoGeneral.Accidentes = valor;
    }

    function changeTegidosBlandos(valor) {
      vm.documentoGeneral.TejidosBlandos = valor;
    }

    function autoSave() {
      save();
    }

    function save() {
      if (!vm.busy) {
        if (vm.documentoGeneralForm.$error.required) {
          $mdDialog.show(
            $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Validando...')
            .textContent('Aun falta informacion necesaria, verifica los datos requeridos')
            .ok('ok')
          );

          return;
        }

        if (!vm.documentoGeneralForm.$valid) {
          $mdDialog.show(
            $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Validando...')
            .textContent('Algunos datos no coinciden con la validacion')
            .ok('ok')
          );

          return;
        }
        vm.busy = true;
        if (!vm.isSaved) {
          vm.documentoGeneral.IdPaciente = vm.idPaciente;
          vm.documentoGeneral.Autor = vm.autores.selectedProfesional;
          DocumentoGeneralService.createDocumentoGeneral(vm.documentoGeneral).then(function() {
            vm.documentoGeneral = DocumentoGeneralService.documentoGeneral;
            vm.documentoGeneral.FechaCreacion = new Date(vm.documentoGeneral.FechaCreacion);
            vm.isSaved = true;
            onDataResult();
          });
        }
      }
    }

    function update() {
      vm.documentoGeneral = {};
      vm.isSaved = false;
      loadMenu();
    }

    function onDataResult() {
      vm.busy = false;
      loadMenu();
    }
    $scope.$watch(
      function watch(scope) {
        return (vm.documentoGeneral);
      },
      function onChangePaciente() {

      }, true);
      
    if (vm.id) {
      vm.busy = true;
      DocumentoGeneralService.getDocumentoGeneral(vm.id).then(function() {
        vm.documentoGeneral = DocumentoGeneralService.documentoGeneral;
        vm.documentoGeneral.FechaCreacion = new Date(vm.documentoGeneral.FechaCreacion);
        vm.isSaved = true;
        onDataResult();
      });
    }
    else if (vm.idPaciente) {
      vm.busy = true;
      DocumentoGeneralService.getDocumentoGeneralByIdPaciente(vm.idPaciente).then(function() {
        if (DocumentoGeneralService.documentoGeneral) {
          vm.documentoGeneral = DocumentoGeneralService.documentoGeneral;
          vm.documentoGeneral.FechaCreacion = new Date(vm.documentoGeneral.FechaCreacion);
          vm.isSaved = true;
        }
        else {
          vm.documentoGeneral = {};
          $mdDialog.show(
      $mdDialog.alert()
        .clickOutsideToClose(true)
        .title('Informacion importante')
        .textContent('Es tu primer registro de atencion para este paciente, por esto no puedes continuar hasta que no ingreses la informacion requerida. Gracias!!')
        .ok('ok'));
        }
        onDataResult();
      });
    }


    vm.paciente = PacienteService.paciente;

    vm.openNewTab = function() {
      $window.open('/#/paciente/', '_blank');
    }
  }
  