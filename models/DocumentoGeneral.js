var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DocumentoGeneralSchema = new Schema({
    FechaCreacion: Date,
    MotivoConsulta: String,
    EnfermedadActual: String,
    MedicamentosActuales: String,
    FiebreReumatica: String,
    Hemorragias: String,
    Cardiopatias: String,
    Hepatitis: String,
    Diabetes: String,
    Alergias: String,
    TensionArterial: String,
    PisoDeBoca: String,
    Carrillos: String,
    Paladar: String,
    Lengua: String,
    Labios: String,
    OtrosAntecedentes: String,
    ObservacionesAntecedentesMedicos: String,
    AntecedentesFamiliares: String,
    IdPaciente: {type: Schema.Types.ObjectId, ref: 'Paciente'},
    Autor: {
        type: Schema.Types.Mixed,
        required: true
    }
});

module.exports = mongoose.model('DocumentoGeneral', DocumentoGeneralSchema, 'DocumentoGeneral');