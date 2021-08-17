var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DocumentoGeneralSchema = new Schema({
    FechaCreacion: Date,
    MotivoConsulta: String,
    EstadoSalud: String,
    MedicamentosActuales: String,
    Embarazada: String,
    Fuma: String,
    Alergias: String,
    Cardiopatias: String,
    Hipertension: String,
    Hepatitis: String,
    FiebreReumatica: String,
    Hemorragias: String,
    Diabetes: String,
    OtrosAntecedentes: String,
    Habitos: String,
    OtrosAntecedentesOdontologicos: String,
    ExamenEstomatologico: String,
    Accidentes: String,
    TejidosBlandos: String,
    ObservacionesAntecedentesMedicos: String,
    IdPaciente: {type: Schema.Types.ObjectId, ref: 'Paciente'},
    Autor: {
        type: Schema.Types.Mixed,
        required: true
    }
});

module.exports = mongoose.model('DocumentoGeneral', DocumentoGeneralSchema, 'DocumentoGeneral');