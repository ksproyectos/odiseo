var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RIPSConsultaSchema   = new Schema({
    FechaCreacion: Date,
    IdPaciente: {type: Schema.Types.ObjectId, ref: 'Paciente'},
    CodigoConsultaRIPS: String,
    FinalidadConsultaRIPS: String,
    CausaExternaRIPS: String,
    GrupoDX1: String,
    CodigoDX1: String
});

module.exports = mongoose.model('RIPSConsulta', RIPSConsultaSchema, 'RIPSConsultas');