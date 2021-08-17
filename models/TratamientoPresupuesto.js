var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TratamientoPresupuestoSchema   = new Schema({
    FechaCreacion: Date,
    IdPaciente: {type: Schema.Types.ObjectId, ref: 'Paciente'},
    IdTratamiento: { type: mongoose.Schema.Types.ObjectId, ref: 'Tratamiento' },
    Descripcion: String,
    Dientes: Schema.Types.Mixed,
    Valor: Number,
    Descuento: Number,
    Suspendido: Boolean,
    UltimaActualizacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TratamientoPresupuesto', TratamientoPresupuestoSchema, 'TratamientosPresupuesto');