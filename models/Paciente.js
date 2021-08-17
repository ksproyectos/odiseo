var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PacienteSchema   = new Schema({
    FechaCreacion: Date,
    DocumentoIdentidad: {
        type: String,
        index: true,
        unique: true
    },
    TipoDocumento: String,
    PrimerNombre: String,
    SegundoNombre: String,
    PrimerApellido: String,
    SegundoApellido: String,
    Sexo: String,
    FechaNacimiento: Date,
    EstadoCivil: String,
    Ocupacion: String,
    EPS: String,
    TipoAfiliacion: String,
    DireccionResidencia: String,
    BarrioResidencia: String,
    CiudadResidenciaDANE: String,
    CiudadRecidenciaOtra: String,
    DepartamentoRecidenciaDANE: String,
    Telefono: String,
    Celular: String,
    ResponsableNombre: String,
    ResponsableParentesco: String,
    ResponsableTelefono: String,
    AcompananteNombre: String,
    AcompananteParentesco: String,
    AcompananteTelefono: String,
    UltimaActualizacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Paciente', PacienteSchema, 'Pacientes');