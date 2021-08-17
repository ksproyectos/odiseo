angular.module('odiseo')
  .service('SpeechRecognitionAPI', SpeechRecognitionAPI);
SpeechRecognitionAPI['$inject'] = ['$q'];

function SpeechRecognitionAPI($q) {

  /* system */
  var optionalParam = /\s*\((.*?)\)\s*/g;
  var optionalRegex = /(\(\?:[^)]+\))\?/g;
  var namedParam = /(\(\?)?:\w+/g;
  var splatParam = /\*\w+/g;
  var escapeRegExp = /[\-{}\[\]+?.,\\\^$|#]/g;
  var commandToRegExp = function(command) {
    command = command.replace(escapeRegExp, '\\$&')
      .replace(optionalParam, '(?:$1)?')
      .replace(namedParam, function(match, optional) {
        return optional ? match : '([^\\s]+)';
      })
      .replace(splatParam, '(.*?)')
      .replace(optionalRegex, '\\s*$1?\\s*');
    return new RegExp('^' + command + '$', 'i');
  };
  var callbacks = {
    start: [],
    error: [],
    end: [],
    soundstart: [],
    result: [],
    resultMatch: [],
    resultNoMatch: [],
    errorNetwork: [],
    errorPermissionBlocked: [],
    errorPermissionDenied: []
  };
  var invokeCallbacks = function(callbacks, ...args) {
    callbacks.forEach(function(callback) {
      callback.callback.apply(callback.context, args);
    });
  };
  var commandsList = [];
  
  function registerCommand(command, callback, originalPhrase, scope) {
    commandsList.push({
      command,
      callback,
      originalPhrase,
      scope
    });
  };
  function searchCommands(commandText) {
    if (/borrar/gi.test(commandText)) {
      final_transcript = '';
      return;
    }
    for (let j = 0, l = commandsList.length; j < l; j++) {
      var currentCommand = commandsList[j];
      var result = currentCommand.command.exec(commandText);
      console.log(result, commandText);
      if (result) {
        console.log("result");
        var parameters = result.slice(1);
        // execute the matched command
        console.log("Comando ejecutado");
        currentCommand.callback.apply(this, parameters);
        invokeCallbacks(callbacks.resultMatch)
        
        final_transcript = '';
        interim_transcript = '';
        return;
      }
    }
  }
  
  this.addCommands = function(commands, scope) {
    var cb;
    for (let phrase in commands) {
      if (commands.hasOwnProperty(phrase)) {
        cb = commands[phrase];
        if (typeof cb === 'function') {
          // convert command to regex then register the command
          registerCommand(commandToRegExp(phrase), cb, phrase, scope);
        }
        else if (typeof cb === 'object' && cb.regexp instanceof RegExp) {
          // register the command
          registerCommand(new RegExp(cb.regexp.source, 'i'), cb.callback, phrase, scope);
        }
        else {
          continue;
        }
      }
    }
  }
  this.addCallback = function(type, callback, context) {
    var cb = callback;
    if (typeof cb === 'function' && callbacks[type] !== undefined) {
      callbacks[type].push({
        callback: cb,
        context: context || this
      });
    }
  }
  this.removeCommands = function(commandsToRemove) {
    if (commandsToRemove === undefined) {
      commandsList = [];
    }
    else {
      commandsToRemove = Array.isArray(commandsToRemove) ? commandsToRemove : [commandsToRemove];
      commandsList = commandsList.filter(command => {
        for (let i = 0; i < commandsToRemove.length; i++) {
          if (commandsToRemove[i] === command.originalPhrase || commandsToRemove[i] === command.scope) {
            return false;
          }
        }
        return true;
      });
    }
  }

  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'es-CO';
  recognition.start();
  interim_transcript = '';
  final_transcript = '';
  
  recognition.onresult = function(event) {
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
      console.log();
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
        console.log("final: " + final_transcript);
        searchCommands(final_transcript.trim());
      }
      else {
        interim_transcript += event.results[i][0].transcript;
        console.log("interim: " + interim_transcript);
        searchCommands(interim_transcript.trim());
      }
    }

  };
  recognition.onend = function() {
    console.log("end");
    setTimeout(function() {
      recognition.start();
    }, 1000 );

  }
}
