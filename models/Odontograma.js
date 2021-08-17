var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OdontogramaSchema = new Schema({
    FechaCreacion: Date,
    data: [],
    IdPaciente: {type: Schema.Types.ObjectId, ref: 'Paciente'},
    Autor: {
        type: Schema.Types.Mixed,
        required: true
    },
    Tipo: String,
    IdOdontogramaPadre: {type: Schema.Types.ObjectId, ref: 'Odontograma'},
});

module.exports = mongoose.model('Odontograma', OdontogramaSchema, 'Odontograma');