"use strict";
angular.module('odiseo')
    .directive("odontograma", function() {

        function link(scope, element, attrs, controller, transcludeFn) {
            var actions = {
                    "noaction": {
                        execute: function(params) {

                        }
                    },
                    "exodoncia_indicada": {
                        execute: function(params){
                            var margen = 5;
                            params.ctx.beginPath();
                            params.ctx.lineWidth = 8;
                            params.ctx.moveTo(params.diente.inicio_x + margen, params.diente.inicio_y + params.diente.medida - margen);
                            params.ctx.lineTo(params.diente.inicio_x + params.diente.medida - margen,params.diente.inicio_y + margen);
                            params.ctx.moveTo(params.diente.inicio_x + margen, params.diente.inicio_y + margen);
                            params.ctx.lineTo(params.diente.inicio_x + params.diente.medida - margen,params.diente.inicio_y + params.diente.medida - margen);
                            params.ctx.closePath();
                            params.ctx.strokeStyle = "#000";
                            params.ctx.stroke();
                        }
                    },
                    "endodoncia_indicada": {
                        execute: function(params){
                        
                            var margen = 5;
                            
                            params.ctx.lineWidth = 2;
                            params.ctx.beginPath();
                            params.ctx.moveTo(params.diente.inicio_x + margen, params.diente.inicio_y + params.diente.medida - margen);
                            params.ctx.lineTo(params.diente.inicio_x + params.diente.medida/2,params.diente.inicio_y + margen);
                            params.ctx.lineTo(params.diente.inicio_x + params.diente.medida - margen ,params.diente.inicio_y + params.diente.medida - margen);
                            params.ctx.lineTo(params.diente.inicio_x + margen ,params.diente.inicio_y + params.diente.medida - margen);
                            params.ctx.closePath();
                            params.ctx.strokeStyle = "#000";
                            params.ctx.stroke();
                            params.ctx.fillStyle = 'red';
                            params.ctx.fill();
                        }
                    },
                    "caries": { 
                        execute: function(params) {
                            params.ctx.lineWidth = 1;
                            params.diente.drawZona(params.ctx, "black", params.zona, "#e74c3c");
                        }
                    },
                    "amalgama_adaptada": {
                        execute: function(params) {
                            params.ctx.lineWidth = 1;
                            params.diente.drawZona(params.ctx, "black", params.zona, "#3498db");
                        }
                    },
                    "amalgama_desadaptada": {
                        execute: function(params) {
                            params.ctx.lineWidth = 3;
                            params.diente.drawZona(params.ctx, "#e74c3c", params.zona, "#3498db");
                        }
                    },
                    "ausente": {
                        execute: function(params) {
                            params.ctx.lineWidth = 1;
                            params.diente.drawExtern(params.ctx, "black", "black");
                        }
                    },
                    "corona": {
                        execute: function(params) {
                            params.ctx.lineWidth = 3;
                            params.diente.drawExtern(params.ctx, "#3498db", "transparent");
                        }
                    },
                    "corona_desadaptada": {
                        execute: function(params) {
                            params.ctx.lineWidth = 3;
                            params.diente.drawExtern(params.ctx, "#e74c3c", "transparent");
                        }
                    },
                    "diente_erupcion": {
                        execute: function(params) {
                            params.ctx.lineWidth = 2;
                            params.ctx.strokeStyle = "#e74c3c";
                            var fromx = params.diente.inicio_x + (params.diente.medida / 2);
                            var tox = params.diente.inicio_x + (params.diente.medida / 2);
                            var fromy = params.diente.inicio_y + params.diente.medida;
                            var toy = params.diente.inicio_y;
    
                            var headlen = 10; // length of head in pixels
                            var angle = Math.atan2(toy - fromy, tox - fromx);
                            params.ctx.beginPath();
                            params.ctx.moveTo(fromx, fromy);
                            params.ctx.lineTo(tox, toy);
                            params.ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
                            params.ctx.moveTo(tox, toy);
                            params.ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
                            params.ctx.closePath();
                            params.ctx.stroke();
                        }
                    },
                    "fractura": {
                        execute: function(params) {
                            var inicio_x = params.diente.inicio_x;
                            var inicio_y = params.diente.inicio_y;
                            var medida = params.diente.medida;
                            var cuarto = params.diente.medida / 4;
                            var tercio = cuarto * 3;
                            params.ctx.strokeStyle = "#e74c3c";
                            if (params.zona == 4) {
                                params.ctx.lineWidth = 3;
                                params.ctx.beginPath();
                                params.ctx.moveTo(inicio_x, inicio_y + medida / 2);
                                params.ctx.lineTo(inicio_x + cuarto, inicio_y + medida / 2);
                                params.ctx.closePath();
                                params.ctx.stroke();
                            }
                            if (params.zona == 1) {
                                params.ctx.lineWidth = 3;
                                params.ctx.beginPath();
                                params.ctx.moveTo(inicio_x + medida / 2, inicio_y);
                                params.ctx.lineTo(inicio_x + medida / 2, inicio_y + cuarto);
                                params.ctx.closePath();
                                params.ctx.stroke();
                            }
                            if (params.zona == 2) {
                                params.ctx.lineWidth = 3;
                                params.ctx.beginPath();
                                params.ctx.moveTo(inicio_x + cuarto * 3, inicio_y + medida / 2);
                                params.ctx.lineTo(inicio_x + cuarto * 4, inicio_y + medida / 2);
                                params.ctx.closePath();
                                params.ctx.stroke();
                            }
                            if (params.zona == 3) {
                                params.ctx.lineWidth = 3;
                                params.ctx.beginPath();
                                params.ctx.moveTo(inicio_x + medida / 2, inicio_y + medida);
                                params.ctx.lineTo(inicio_x + medida / 2, inicio_y + cuarto * 3);
                                params.ctx.closePath();
                                params.ctx.stroke();
                            }
                            if (params.zona == 5) {
                                params.ctx.lineWidth = 3;
                                params.ctx.beginPath();
                                params.ctx.moveTo(inicio_x + cuarto, inicio_y + cuarto * 3);
                                params.ctx.lineTo(inicio_x + cuarto * 3, inicio_y + cuarto);
                                params.ctx.closePath();
                                params.ctx.stroke();
                            }
                        }
                    },
                    "provisional_adaptado": {
                        execute: function(params) {
                            $("body").append('<canvas id="pattern"></canvas>');
                            var c = $.find("#pattern")[0];
                            c.width = 3;
                            c.height = 3;
                            var ctx = c.getContext("2d");
                            ctx.arc(0, 0, 3, 0, 2 * Math.PI);
                            ctx.strokeStyle = "#3498db";
                            ctx.stroke();
                            params.ctx.lineWidth = 3;
                            var pat = params.ctx.createPattern(c, "repeat");
                            params.diente.drawExtern(params.ctx, "#3498db", pat);
                            $("#pattern").remove();
                        }
                    },
                    "provisional_desadaptado": {
                        execute: function(params) {
                            $("html").append('<canvas id="pattern"></canvas>');
                            var c = $.find("#pattern")[0];
                            c.width = 3;
                            c.height = 3;
                            var ctx = c.getContext("2d");
                            ctx.arc(0, 0, 3, 0, 2 * Math.PI);
                            ctx.strokeStyle = "#e74c3c";
                            ctx.stroke();
                            params.ctx.lineWidth = 3;
                            var pat = params.ctx.createPattern(c, "repeat");
                            params.diente.drawExtern(params.ctx, "#e74c3c", pat);
                            $("#pattern").remove();
                        }
                    },
                    "ortodoncia": {
                        execute: function(params) {
                            params.ctx.lineWidth = 4;
                            var ctx = params.ctx;
                            var diente1 = params.diente1;
                            var diente2 = params.diente2;
                            ctx.moveTo(diente1.getInicioX(), diente1.getInicioY() + diente2.getMedida() + 10);
                            ctx.lineTo(diente2.getInicioX() + diente2.getMedida(), diente2.getInicioY() + diente2.getMedida() + 10);
                            ctx.strokeStyle = "#f00";
                            ctx.stroke();
    
                        }
                    },
                    "resina_adaptada": {
                        execute: function(params) {
                            params.ctx.lineWidth = 1;
                            $("html").append('<canvas id="pattern"></canvas>');
                            var c = $.find("#pattern")[0];
                            c.width = 3;
                            c.height = 3;
                            var ctx = c.getContext("2d");
                            ctx.arc(0, 0, 3, 0, 2 * Math.PI);
                            ctx.strokeStyle = "#3498db";
                            ctx.stroke();
                            params.ctx.lineWidth = 1;
                            var pat = params.ctx.createPattern(c, "repeat");
                            params.diente.drawZona(params.ctx, "black", params.zona, pat);
                            $("#pattern").remove();
    
                        }
                    },
                    "resina_desadaptada": {
                        execute: function(params) {
                            $("html").append('<canvas id="pattern"></canvas>');
                            var c = $.find("#pattern")[0];
                            c.width = 3;
                            c.height = 3;
                            var ctx = c.getContext("2d");
                            ctx.arc(0, 0, 3, 0, 2 * Math.PI);
                            ctx.strokeStyle = "#e74c3c";
                            ctx.stroke();
                            var pat = params.ctx.createPattern(c, "repeat");
                            params.ctx.lineWidth = 1;
                            params.diente.drawZona(params.ctx, "black", params.zona, pat);
                            $("#pattern").remove();
                        }
                    },
                    "sellante_indicado": {
                        execute: function(params) {
                            $("html").append('<canvas id="pattern"></canvas>');
                            var c = $.find("#pattern")[0];
                            c.width = 4;
                            c.height = 4;
                            var ctx = c.getContext("2d");
                            ctx.moveTo(2, 0);
                            ctx.lineTo(2, 4);
                            ctx.strokeStyle = "#e74c3c";
                            ctx.stroke();
                            var pat = params.ctx.createPattern(c, "repeat");
                            params.ctx.lineWidth = 2;
                            params.diente.drawZona(params.ctx, "#e74c3c", params.zona, pat);
                        }
                    },
                    "sellante": {
                        execute: function(params) {
                            params.ctx.lineWidth = 1;
                            $("html").append('<canvas id="pattern"></canvas>');
                            var c = $.find("#pattern")[0];
                            c.width = 5;
                            c.height = 5;
                            var ctx = c.getContext("2d");
                            ctx.moveTo(2, 0);
                            ctx.lineTo(2, 5);
                            ctx.strokeStyle = "#3498db";
                            ctx.stroke();
                            var pat = params.ctx.createPattern(c, "repeat");
                            params.diente.drawZona(params.ctx, "black", params.zona, pat);
                        }
                    },
                    "sano": {
                        execute: function(params) {
                            params.ctx.beginPath();
                            params.ctx.moveTo(params.diente.inicio_x + 38,params.diente.inicio_y + 14);
                            params.ctx.lineTo(params.diente.inicio_x + 9, params.diente.inicio_y + 39);
                            params.ctx.lineTo(params.diente.inicio_x + 4,params.diente.inicio_y + 21);
                            params.ctx.lineTo(params.diente.inicio_x + 15,params.diente.inicio_y + 25);
                            params.ctx.lineTo(params.diente.inicio_x + 37,params.diente.inicio_y + 13);
                            params.ctx.closePath();
                            params.ctx.strokeStyle = "#000";
                            params.ctx.stroke();
                            params.ctx.fillStyle = 'green';
                            params.ctx.fill();
                            
                        }
                    },
                    "borrar": {
                        execute: function(params) {
                            params.diente.borrar(params.ctx);
                        }
                    }
                }
                /* diente */
            function diente(Id) {
                var _this = this;
                _this.Id = Id;
                _this.inicio_x;
                _this.inicio_y;
                _this.medida;
                this.getInicioX = function() {
                    return _this.inicio_x;
                }
                this.getInicioY = function() {
                    return _this.inicio_y;
                }
                this.getMedida = function() {
                    return _this.medida;
                }
                this.drawZona = function(ctx, color_linea, zona, color_relleno) {
                    var medida = _this.medida;
                    var cua = medida / 4;
                    var ter = cua * 3;
                    var inicio_x = _this.inicio_x;
                    var inicio_y = _this.inicio_y;

                    /* 1ra zona */
                    if (ctx && zona == 1) {
                        ctx.strokeStyle = color_linea;
                        ctx.beginPath();
                        ctx.moveTo(inicio_x, inicio_y);
                        ctx.lineTo(medida + inicio_x, inicio_y);
                        ctx.lineTo(ter + inicio_x, cua + inicio_y);
                        ctx.lineTo(cua + inicio_x, cua + inicio_y);
                        ctx.closePath();
                        ctx.stroke();
                    }
                    /* 2da zona */
                    if (ctx && zona == 2) {
                        ctx.strokeStyle = color_linea;
                        ctx.beginPath();
                        ctx.moveTo(ter + inicio_x, cua + inicio_y);
                        ctx.lineTo(medida + inicio_x, inicio_y);
                        ctx.lineTo(medida + inicio_x, medida + inicio_y);
                        ctx.lineTo(ter + inicio_x, ter + inicio_y);
                        ctx.closePath();
                        ctx.stroke();
                    }
                    /* 3ra zona */
                    if (ctx && zona == 3) {
                        ctx.strokeStyle = color_linea;
                        ctx.beginPath();
                        ctx.moveTo(cua + inicio_x, ter + inicio_y);
                        ctx.lineTo(ter + inicio_x, ter + inicio_y);
                        ctx.lineTo(medida + inicio_x, medida + inicio_y);
                        ctx.lineTo(inicio_x, medida + inicio_y);
                        ctx.closePath();
                        ctx.stroke();
                    }
                    /* 4ta zona */
                    if (ctx && zona == 4) {
                        ctx.strokeStyle = color_linea;
                        ctx.beginPath();
                        ctx.moveTo(inicio_x, inicio_y);
                        ctx.lineTo(cua + inicio_x, cua + inicio_y);
                        ctx.lineTo(cua + inicio_x, ter + inicio_y);
                        ctx.lineTo(inicio_x, medida + inicio_y);
                        ctx.closePath();
                        ctx.stroke();
                    }
                    if (ctx && zona == 5) {
                        ctx.fillStyle = color_linea;
                        ctx.beginPath();
                        ctx.moveTo(cua + inicio_x, cua + inicio_y);
                        ctx.lineTo(ter + inicio_x, cua + inicio_y);
                        ctx.lineTo(ter + inicio_x, ter + inicio_y);
                        ctx.lineTo(cua + inicio_x, ter + inicio_y);
                        ctx.closePath();
                        ctx.strokeStyle = color_linea;
                        ctx.stroke();
                    }
                    ctx.fillStyle = color_relleno || "transparent";
                    ctx.fill();
                }
                this.drawExtern = function(contexto, color_stroke, color_fill) {
                    var ctx = contexto;

                    var inicio_y = _this.inicio_y;
                    var inicio_x = _this.inicio_x;

                    ctx.beginPath();
                    ctx.moveTo(inicio_x, inicio_y);
                    ctx.lineTo(inicio_x + 40, inicio_y);
                    ctx.lineTo(inicio_x + 40, inicio_y + 40);
                    ctx.lineTo(inicio_x, inicio_y + 40);
                    ctx.closePath();

                    ctx.fillStyle = color_fill;
                    ctx.strokeStyle = color_stroke;
                    ctx.stroke();
                    ctx.fill();
                }
                this.borrar = function(contexto) {
                    var ctx = contexto;
                    // Definiendo puntos de dibujo
                    var med = _this.medida + 4;
                    var inicio_y = _this.inicio_y - 2;
                    var inicio_x = _this.inicio_x - 2;
                    ctx.clearRect(inicio_x, inicio_y, med, med);
                }
                this.drawDiente = function(ctx, inicio_x, inicio_y, medida, color_linea) {
                    _this.inicio_y = inicio_y;
                    _this.inicio_x = inicio_x;
                    _this.medida = medida;
                    _this.drawZona(ctx, color_linea, 1);
                    _this.drawZona(ctx, color_linea, 2);
                    _this.drawZona(ctx, color_linea, 3);
                    _this.drawZona(ctx, color_linea, 4);
                    /* Numero de diente */
                    ctx.font = '10pt Arial';
                    ctx.textAlign = 'center';
                    ctx.fillStyle = 'black';
                    ctx.fillText(this.Id, inicio_x + (medida / 2), inicio_y - 5);
                }
            }
            /* odontograma */
            function od(od_container, width, height) {
                var _this = this;
                _this.width = 900;
                _this.height = 300;

                _this.od_container = od_container;
                _this.od_container.append('<canvas id="base" width="' + _this.width + '" height="' + _this.height + '">');
                _this.od_container.append('<canvas id="layer1" width="' + _this.width + '" height="' + _this.height + '">');
                _this.od_container.append('<canvas id="layer2" width="' + _this.width + '" height="' + _this.height + '">');
                _this.od_container.append('<canvas id="layer3" width="' + _this.width + '" height="' + _this.height + '">');

                _this.base = _this.od_container.find("#base");
                _this.ctx = _this.base[0].getContext("2d");
                _this.layer1 = _this.od_container.find("#layer1");
                _this.ctx1 = _this.layer1[0].getContext("2d");
                _this.layer2 = _this.od_container.find("#layer2");
                _this.ctx2 = _this.layer2[0].getContext("2d");
                _this.layer3 = _this.od_container.find("#layer3");
                _this.ctx3 = _this.layer3[0].getContext("2d");

                _this.dientes = [];

                _this.color_linea = 'black';
                _this.medida = 40;
                _this.separacion_x = 10;
                _this.separacion_y = 20;
                _this.separacion_cuadrante_x = 50;
                _this.separacion_cuadrante_y = 30;
                _this.espacio_superior = 20;
                _this.espacio_lateral = 0;

                _this.currentDiente;
                _this.currentZona;
                _this.currentaction = "caries";

                this.createBase = function() {

                    /* Crear lista de dientes */

                    var color_linea = _this.color_linea;
                    var medida = _this.medida;
                    var separacion_x = _this.separacion_x;
                    var separacion_y = _this.separacion_y;
                    var separacion_cuadrante_x = _this.separacion_cuadrante_x;
                    var separacion_cuadrante_y = _this.separacion_cuadrante_y;
                    var espacio_superior = _this.espacio_superior;
                    var espacio_lateral = _this.espacio_lateral;
                    var inicio_x = espacio_lateral;
                    var inicio_y = espacio_superior;


                    /* funcion reutilizable */
                    var createBase_createDiente = function(i) {
                            _this.dientes["od-" + i] = new diente(i);
                            _this.dientes["od-" + i].drawDiente(_this.ctx, inicio_x, inicio_y, medida, color_linea);
                        }
                        /* ondontograma estilo 1 */
                    var draw_style_1 = function() {
                        var x = 0;
                        for (var i = 18; i >= 11; i--) {
                            inicio_x = (x * medida) + (separacion_x * x) + separacion_x;
                            createBase_createDiente(i);
                            x++;
                        }
                        for (var i = 21; i <= 28; i++) {
                            inicio_x = (x * medida) + (separacion_x * x) + separacion_x + separacion_cuadrante_x;
                            createBase_createDiente(i);
                            x++;
                        }
                        inicio_y = espacio_superior + separacion_cuadrante_y + medida;
                        x = 3;
                        for (var i = 55; i >= 51; i--) {
                            inicio_x = (x * medida) + (separacion_x * x) + separacion_x;
                            createBase_createDiente(i);
                            x++;
                        }
                        for (var i = 61; i <= 65; i++) {
                            inicio_x = (x * medida) + (separacion_x * x) + separacion_x + separacion_cuadrante_x;
                            createBase_createDiente(i);
                            x++;
                        }
                        x = 3;
                        inicio_y = espacio_superior + (separacion_cuadrante_y + medida) * 2;
                        for (var i = 85; i >= 81; i--) {
                            inicio_x = (x * medida) + (separacion_x * x) + separacion_x;
                            createBase_createDiente(i);
                            x++;
                        }
                        for (var i = 71; i <= 75; i++) {
                            inicio_x = (x * medida) + (separacion_x * x) + separacion_x + separacion_cuadrante_x;
                            createBase_createDiente(i);
                            x++;
                        }
                        x = 0;
                        inicio_y = espacio_superior + ((separacion_cuadrante_y + medida) * 3);
                        for (var i = 48; i >= 41; i--) {
                            inicio_x = (x * medida) + (separacion_x * x) + separacion_x;
                            createBase_createDiente(i);
                            x++;
                        }
                        for (var i = 31; i <= 38; i++) {
                            inicio_x = (x * medida) + (separacion_x * x) + separacion_x + separacion_cuadrante_x;
                            createBase_createDiente(i);
                            x++;
                        }
                    }

                    var seleccionarZona = function(x, y) {;
                        x = x - _this.base.offset().left;
                        y = y - _this.base.offset().top + window.pageYOffset;

                        for (var index in _this.dientes) {
                            if (_this.dientes[index].getInicioX() <= x && (_this.dientes[index].getInicioX() + _this.dientes[index].getMedida()) >= x && _this.dientes[index].getInicioY() <= y && (_this.dientes[index].getInicioY() + _this.dientes[index].getMedida()) >= y) {
                                _this.currentDiente = _this.dientes[index];
                            }
                        }
                        var diente = _this.currentDiente;
                        if (diente) {
                            y = y - diente.getInicioY();
                            x = x - diente.getInicioX();
                            if (y > 0 && y < (diente.getMedida() / 4) && x > y && y < diente.getMedida() - x) {
                                _this.currentZona = 1;
                            }
                            else if (x > (diente.getMedida() / 4) * 3 && x < diente.getMedida() && y < x && diente.getMedida() - x < y) {
                                _this.currentZona = 2;
                            }
                            else if (y > (diente.getMedida() / 4) * 3 && y < diente.getMedida() && x < y && x > diente.getMedida() - y) {
                                _this.currentZona = 3;
                            }
                            else if (x > 0 && x < (diente.getMedida() / 4) && y > x && x < diente.getMedida() - y) {
                                _this.currentZona = 4;
                            }
                            else if (x > (diente.getMedida() / 4) && x < (diente.getMedida() / 4) * 3 && y > (diente.getMedida() / 4) && y < (diente.getMedida() / 4) * 3) {
                                _this.currentZona = 5;
                            }
                            var zona = _this.currentZona;
                            if (zona) {
                                color_linea = 'yellow';
                                _this.ctx3.clearRect(0, 0, 1000, 300);
                                diente.drawZona(_this.ctx3, color_linea, zona);
                            }
                            else {
                                _this.ctx3.clearRect(0, 0, 1000, 300);
                            }
                        }
                    }

                    var applyAction = function() {
                        _this.setAction(actions[scope.activeAction], {
                            diente: _this.currentDiente,
                            zona: _this.currentZona
                        });
                    }
                    draw_style_1();

                    var onOdontogramaMouseMove = function(event) {
                        seleccionarZona(event.x, event.y);
                    }
                    var onOdontogramaClick = function(event) {
                        applyAction();
                    }
                    _this.layer3[0].addEventListener("mousemove", onOdontogramaMouseMove, false);

                    _this.layer3[0].addEventListener("click", onOdontogramaClick, false);
                }

                this.getDientes = function() {
                    return _this.dientes;
                }
                this.setDientes = function(dientes) {
                    _this.dientes = dientes;
                }
                this.setAction = function(action, params, ExecOnApply = true) {
                    params.ctx = _this.ctx1;
                    action.execute(params);
                    if(ExecOnApply){
                        scope.onApplyAction({
                            diente: params.diente.Id,
                            zona: params.zona
                        });
                    }
                    }
                    
            }

            var od1 = new od($(element), 1000, 300);

            od1.createBase();

            scope.onDataUpdated.callback = function() {
                od1.ctx1.clearRect(0, 0, od1.layer1[0].width, od1.layer1[0].height);
                angular.forEach(scope.odontogramaData.data, function(zonas, diente) {
                    if (zonas == null || typeof zonas == 'undefined') {
                        return;
                    }
                    angular.forEach(zonas, function(action, zona) {
                        if (action == null || typeof action == 'undefined') {
                            return;
                        }
                        od1.setAction(actions[action], {
                            diente: od1.dientes["od-" + diente],
                            zona: zona
                        }, false);
                    });
                });
            };
            scope.commands.applyAction = function(action, diente, zona) {
                od1.setAction(actions[action], {
                    diente: od1.dientes["od-" + diente],
                    zona: zona
                });
            }


        }
        return {
            restrict: 'A',
            link: link,
            scope: {
                activeAction: '=',
                onApplyAction: '&',
                onDataUpdated: '=',
                odontogramaData: '=',
                commands: '='
            },
            templateUrl: 'app/Odontograma/odontograma.html',
            replace: true
        };

    });
