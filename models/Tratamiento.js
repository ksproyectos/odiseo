var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TratamientoSchema   = new Schema({
    Nombre: String,
    Valor: Number,
    Inactivo: { type: Boolean, default: false }
});

module.exports = mongoose.model('Tratamiento', TratamientoSchema, 'Tratamientos');