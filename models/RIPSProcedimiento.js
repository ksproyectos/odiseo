var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RIPSProcedimientoSchema   = new Schema({
    FechaCreacion: Date,
    IdPaciente: {type: Schema.Types.ObjectId, ref: 'Paciente'},
    GrupoCUPS: String,
    CUPSRIPS: String
});

module.exports = mongoose.model('RIPSProcedimiento', RIPSProcedimientoSchema, 'RIPSProcedimientos');