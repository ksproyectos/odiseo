var express = require('express');
var mongoose = require('mongoose');
const fs = require('fs');
const moment = require('moment');
const json2csv = require('json2csv').parse;
const path = require('path')



mongoose.connect('mongodb://127.0.0.1:27017/odiseo');

var Paciente = require('../models/Paciente');
var DocumentoGeneral = require('../models/DocumentoGeneral');
var Odontograma = require('../models/Odontograma');
var Evolucion = require('../models/Evolucion');
var Agenda = require('../models/Agenda');
var Profesional = require('../models/Profesional');
var Tratamiento = require('../models/Tratamiento');
var TratamientoPresupuesto = require('../models/TratamientoPresupuesto');
var Pago = require('../models/Pago');
var RIPSConsulta = require('../models/RIPSConsulta');
var RIPSProcedimiento = require('../models/RIPSProcedimiento');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function (req, res) {
    RIPSConsulta.find({}, function (err, data) {
        if (err) {
          return res.status(500).json({ err });
        }
        else {
          let csv
          try {
            fields = [
                "CodigoConsultaRIPS", 
                "FinalidadConsultaRIPS",
                "CausaExternaRIPS",
                "GrupoDX1",
                "CodigoDX1"
            ];

            csv = json2csv(data, { fields });
          } catch (err) {
              console.log("here");
            return res.status(500).json({ err });
          }
          const dateTime = moment().format('YYYYMMDDhhmmss');
          const filePath = path.join(__dirname, "..", "public", "exports", "csv-" + dateTime + ".csv")
          fs.writeFile(filePath, csv, function (err) {
            if (err) {
              return res.json(err).status(500);
            }
            else {
              setTimeout(function () {
                fs.unlinkSync(filePath); // delete this file after 30 seconds
              }, 30000)
              return res.json("/exports/csv-" + dateTime + ".csv");
            }

          });
    
        }
      })
});

router.route('/pacientes')
        .post(function (req, res) {
            var paciente = new Paciente(req.body);
            paciente.save(function (err, paciente) {
                if (err)
                    res.send(err);
                res.json(paciente);
            });

        })
        .get(function (req, res) {
            Paciente.find(function (err, pacientes) {
                if (err)
                    res.send(err);

                res.json(pacientes);
            });
        });

router.route('/pacientes/:_id')
        .get(function (req, res) {
            Paciente.findOne({
                _id: req.params._id
            }, function (err, paciente) {
                if (err)
                    res.send(err);

                res.json(paciente);
            });
        })
        .post(function (req, res) {
            Paciente.findOneAndUpdate({
                _id: req.params._id
            }, req.body, {}, function (paciente) {
                res.json(paciente);
            });
        });

router.post('/pacientes/find/object', function (req, res) {
    Paciente.findOne(req.body, function (err, paciente) {
        if (err)
            res.send(err);
        if (paciente == null) {
            res.json({});
            return true;
        }
        res.json(paciente);
    });
});

router.route('/pacientes/:_id/documento-general')
        .get(function (req, res) {
            DocumentoGeneral.findOne({
                IdPaciente: req.params._id,

            }, function (err, documentoGeneral) {
                if (err)
                    res.send(err);
                res.json(documentoGeneral);
            }).sort({FechaCreacion: -1});
        })
        .post(function (req, res) {
            var documentoGeneral = new DocumentoGeneral(req.body);
            documentoGeneral.FechaCreacion = new Date();
            documentoGeneral.save(function (err, documentoGeneral) {
                if (err)
                    res.send(err);
                res.json(documentoGeneral);
            });

        });

router.route('/pacientes/:_id/odontograma/:tipo')
        .get(function (req, res) {
            var filter;
            if(req.params.tipo == "evolucion"){
                filter = {
                    IdPaciente: req.params._id
                };
            }else{
                filter = {
                    IdPaciente: req.params._id,
                    Tipo: "Inicial" 
                };
            }
            Odontograma.findOne(filter, function (err, odontograma) {
                if (err)
                    res.send(err);

                res.json(odontograma);
            }).sort({FechaCreacion: -1});
        })
        .post(function (req, res) {
            var odontograma = new Odontograma(req.body);    
            odontograma.FechaCreacion = new Date();
            if(req.params.tipo == "evolucion"){
                odontograma.Tipo = "Evolucion";
                odontograma.IdOdontogramaPadre = odontograma._id;
                odontograma._id = undefined;
            }else{
                odontograma.Tipo = "Inicial";
            }
            odontograma.save(function (err, odontograma) {
                if (err)
                    res.send(err);
                res.json(odontograma);
            });

        })

router.route('/pacientes/:_id/evolucion')
        .post(function (req, res) {
            var evolucion = new Evolucion(req.body);
            evolucion.FechaCreacion = new Date();
            evolucion.save(function (err, evolucion) {
                if (err)
                    res.send(err);
                res.json(evolucion);
            });

        })
        .get(function (req, res) {
            Evolucion.find({
                IdPaciente: req.params._id
            }, function (err, evolucion) {
                if (err)
                    res.send(err);

                res.json(evolucion);
            });
        });
router.route('/pacientes/:_id/RIPS/consultas')
        .post(function (req, res) {
            var model = new RIPSConsulta(req.body);
            model.FechaCreacion = new Date();
            model.save(function (err, result) {
                if (err)
                    res.send(err);
                res.json(result);
            });

        });
router.route('/pacientes/:_id/RIPS/procedimientos')
        .post(function (req, res) {
            var model = new RIPSProcedimiento(req.body);
            model.FechaCreacion = new Date();
            model.save(function (err, result) {
                if (err)
                    res.send(err);
                res.json(result);
            });

        });


router.get('/documento-general/:_id', function (req, res) {
    DocumentoGeneral.findOne({
        _id: req.params._id
    }, function (err, documentoGeneral) {
        if (err)
            res.send(err);

        res.json(documentoGeneral);
    });
});
router.get('/odontogramas/:_id', function (req, res) {
    Odontograma.findOne({
        _id: req.params._id
    }, function (err, odontograma) {
        if (err)
            res.send(err);
        res.json(odontograma);
    });
});

router.get('/agenda', function (req, res) {
    Agenda.find({start_date: {$gt: new Date(req.query.from)}, end_date: {$lt: new Date(req.query.to)}}).populate('IdPaciente', 'DocumentoIdentidad PrimerNombre PrimerApellido Telefono').exec(function (err, agenda) {
        if (err)
            res.send(err);
        res.json(agenda);
    });
    ;
});
router.route('/agenda/:id')
        .post(function (req, res) {
            var cita = new Agenda(req.body);
            cita.FechaCreacion = new Date();
            cita.id = req.params.id;
            cita.save(function (err) {
                if (err)
                    res.send(err);
                Paciente.findOne(cita.IdPaciente, 'DocumentoIdentidad PrimerNombre PrimerApellido Telefono', function (err, paciente) {
                    cita.IdPaciente = paciente;
                    res.json(cita);
                });

            });
        })
        .delete(function (req, res) {
            Agenda.remove({
                id: req.params.id
            }, function (err, cita) {
                if (err)
                    return res.send(err);
                res.json({message: "success"});
            });
        })
        .put(function (req, res) {

            Agenda.findOne({id: req.params.id}, function (err, cita) {

                if (err)
                    res.send(err);

                cita.text = req.body.text;
                cita.start_date = req.body.start_date;
                cita.end_date = req.body.end_date;
                cita.text = req.body.text;
                cita.descripcion = req.body.descripcion;
                cita.IdAsignado = req.body.IdAsignado;

                cita.save(function (err) {
                    if (err)
                        res.send(err);

                    Paciente.findOne(cita.IdPaciente, 'DocumentoIdentidad PrimerNombre PrimerApellido Telefono', function (err, paciente) {
                        cita.IdPaciente = paciente;
                        res.json(cita);
                    });
                });

            });
        });


router.route('/equipo-salud/')
        .get(function (req, res) {
            Profesional.find(function (err, equipo) {
                if (err)
                    res.send(err);
                res.json(equipo);
            });
        })
        .post(function (req, res) {
            var profesional = new Profesional(req.body);
            profesional.save(function (err) {
                if (err)
                    res.send(err);
                res.json(profesional);
            });
        })
router.route('/equipo-salud/:_id')
        .get(function (req, res) {
            Profesional.findOne({
                _id: req.params._id
            }, function (err, profesional) {
                if (err)
                    res.send(err);

                res.json(profesional);
            });
        })
        .delete(function (req, res) {
            Profesional.remove({
                _id: req.params._id
            }, function (err) {
                if (err)
                    return res.send(err);
                res.json({message: "success"});
            });
        })
        .put(function (req, res) {

            Profesional.findOne({_id: req.params._id}, function (err, profesional) {

                if (err)
                    res.send(err);

                profesional.NoIdentificacion = req.body.NoIdentificacion;
                profesional.TipoIdentificacion = req.body.TipoIdentificacion;
                profesional.NombreCompleto = req.body.NombreCompleto;

                profesional.save(function (err) {
                    if (err)
                        res.send(err);
                    res.json(profesional);
                });

            });
        });

router.route('/tratamientos/')
        .get(function (req, res) {
            Tratamiento.find({Inactivo: false}, function (err, tratamientos) {
                if (err)
                    res.send(err);
                res.json(tratamientos);
            });
        })
        .post(function (req, res) {
            var tratamiento = new Tratamiento(req.body);
            tratamiento.Inactivo = false;
            tratamiento.save(function (err) {
                if (err)
                    res.send(err);
                res.json(tratamiento);
            });
        })
router.route('/tratamientos/:_id')
        .get(function (req, res) {
            Tratamiento.findOne({
                _id: req.params._id
            }, function (err, tratamiento) {
                if (err)
                    res.send(err);

                res.json(tratamiento);
            });
        })
        .delete(function (req, res) {
            Tratamiento.findOne({_id: req.params._id}, function (err, tratamiento) {

                if (err)
                    res.send(err);

                tratamiento.Inactivo = true;

                tratamiento.save(function (err) {
                    if (err)
                        res.send(err);
                    res.json({message: "success"});
                });

            });
        })
        .put(function (req, res) {

            Tratamiento.findOne({_id: req.params._id}, function (err, tratamiento) {

                if (err)
                    res.send(err);

                tratamiento.Nombre = req.body.Nombre;
                tratamiento.Valor = req.body.Valor;

                tratamiento.save(function (err) {
                    if (err)
                        res.send(err);
                    res.json(tratamiento);
                });

            });
        });

router.route('/pacientes/:_id/presupuesto')
        .get(function (req, res) {
            TratamientoPresupuesto.find({
                IdPaciente: req.params._id
            }).populate('IdTratamiento').exec(function (err, tratamientos) {
                if (err)
                    res.send(err);
                res.json(tratamientos);
            });
        })
        .post(function (req, res) {
            var tratamiento = new TratamientoPresupuesto(req.body);
            tratamiento.FechaCreacion = new Date();
            tratamiento.save(function (err) {
                if (err)
                    res.send(err);
                res.json(tratamiento);
            });
        });
router.route('/presupuesto/:_id')
        .get(function (req, res) {
            TratamientoPresupuesto.findOne({
                _id: req.params._id
            }, function (err, tratamiento) {
                if (err)
                    res.send(err);

                res.json(tratamiento);
            });
        })
        .delete(function (req, res) {
            TratamientoPresupuesto.remove({
                _id: req.params._id
            }, function (err) {
                if (err)
                    return res.send(err);
                res.json({message: "success"});
            });
        });

router.route('/paciente/:_id/pagos')
        .get(function (req, res) {
            Pago.find({IdPaciente: req.params._id, Inactivo: false}).populate(
                    {
                        path: 'Tratamientos.IdTratamiento',
                        model: 'Tratamiento'
                    }
            ).exec(function (err, pagos) {
                if (err)
                    res.send(err);

                res.json(pagos);
            });
        })
        .post(function (req, res) {
            var pago = new Pago(req.body);
            pago.FechaCreacion = new Date();
            pago.IdPaciente = req.params._id;
            pago.save(function (err) {
                if (err)
                    res.send(err);
                res.json(pago);
            });
        })
router.route('/pagos/:_id')
        .get(function (req, res) {
            Pago.findOne({
                _id: req.params._id
            }, function (err, pago) {
                if (err)
                    res.send(err);

                res.json(pago);
            });
        })
        .delete(function (req, res) {
            Pago.findOne({
                _id: req.params._id
            }, function (err, pago) {
                if (err)
                    res.send(err);

                pago.Inactivo = true;

                pago.save(function (err) {
                    if (err)
                        res.send(err);
                    res.json({message: "success"});
                });
            });
        });
router.route('/pdf/:_id')
        .get(function (req, res) {
            var jade = require('jade');
            var wkhtmltopdf = require('node-wkhtmltopdf');

            var options = [
                '--quiet',
                '--margin-bottom 1',
                '--margin-left 1',
                '--margin-right 1',
                '--margin-top 1',
                '-d 300',
                '--page-width 70',
                '--page-height 100'

                
            ];

            Pago.findOne({
                _id: req.params._id
            }).populate('IdPaciente').populate({path: 'Tratamientos.IdTratamiento', model: 'Tratamiento'}).exec(function (err, pago) {
                if (err)
                    res.send(err);
                var renderFunc = jade.compileFile('./views/recibo.jade');
                pago.moment = require('moment');
                var html = renderFunc(pago);

                var doc = wkhtmltopdf(options, html);
                res.writeHead(200, {
                    'Content-Type': 'application/pdf',
                    'Access-Control-Allow-Origin': '*',
                    'Content-Disposition': 'inline; filename=order.pdf'
                });
                doc.stdout.pipe(res);
            });




        })
// The function gets a list of objects ('dataList' arg), each one would be a single row in the future-to-be CSV file
// The headers to the columns would be sent in an array ('headers' args). It is taken as the second arg
function dataToCSV(dataList,headers){
    var allObjects = [];
    // Pushing the headers, as the first arr in the 2-dimensional array 'allObjects' would be the first row
    allObjects.push(headers);

    //Now iterating through the list and build up an array that contains the data of every object in the list, in the same order of the headers
    dataList.forEach(function(object){
        var arr = [];
        arr.push(object.id);
        arr.push(object.term);
        arr.push(object.Date);
        // Adding the array as additional element to the 2-dimensional array. It will evantually be converted to a single row
        allObjects.push(arr)
    });

   // Initializing the output in a new variable 'csvContent'
    var csvContent = "";

    // The code below takes two-dimensional array and converts it to be strctured as CSV
    // *** It can be taken apart from the function, if all you need is to convert an array to CSV
    allObjects.forEach(function(infoArray, index){
      var dataString = infoArray.join(",");
      csvContent += index < allObjects.length ? dataString+ "\n" : dataString;
    }); 

    // Returning the CSV output
    return csvContent;
}
module.exports = router;
