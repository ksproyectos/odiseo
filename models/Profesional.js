var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProfesionalSchema   = new Schema({
    FechaCreacion: Date,
    NoIdentificacion: String,
    TipoIdentificacion: String,
    NombreCompleto: String,
    UltimaActualizacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EquipoSalud', ProfesionalSchema, 'EquipoSalud');