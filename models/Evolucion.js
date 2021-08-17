var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EvolucionSchema = new Schema({
    FechaCreacion: Date,
    Evolucion: String,
    IdPaciente: {type: Schema.Types.ObjectId, ref: 'Paciente'},
    Autor: {
        type: Schema.Types.Mixed,
        required: true
    }
});

module.exports = mongoose.model('Evolucion', EvolucionSchema, 'Evolucion');