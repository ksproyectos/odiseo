var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PagoSchema   = new Schema({
    FechaCreacion: Date,
    IdPaciente: {type: Schema.Types.ObjectId, ref: 'Paciente'},
    Tratamientos: [{IdTratamiento: { type: mongoose.Schema.Types.ObjectId, ref: 'Tratamiento' }, Valor: Number, Dientes: Schema.Types.Mixed}],
    Valor: Number,
    Inactivo: { type: Boolean, default: false }
});

module.exports = mongoose.model('Pago', PagoSchema, 'Pagos');