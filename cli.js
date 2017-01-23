#!/usr/bin/env node
'use strict';
var pkg = require('./package.json');
var begoo = require('./');

require('taketalk')({
  init: function (input, options) {
    console.log(begoo(input, options));
  },
  help: function () {
    console.log([
      '',
      '  ' + pkg.description,
      '',
      '  Usage',
      '    begoo <string>',
      '    begoo <string> --maxLength 8',
      '    begoo <string> --avatar name',
      '    Available names: cat, dog, chicken',
      '    echo <string> | begoo',
      '',
      '  Example',
      '    begoo "Amin forked the code from Sindre"',
      begoo('Amin forked the code from Sindre')
    ].join('\n'));
  },
  version: pkg.version
});
