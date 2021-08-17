var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AgendaSchema   = new Schema({
    id: String,
    FechaCreacion: Date,
    descripcion: String,
    text: String,
    start_date: Date,
    end_date: Date,
    cancelado: Boolean,
    IdAsignado: {type: Schema.Types.ObjectId, ref: 'EquipoSalud'},
    IdPaciente: {type: Schema.Types.ObjectId, ref: 'Paciente'},
    UltimaActualizacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Agenda', AgendaSchema, 'Agenda');