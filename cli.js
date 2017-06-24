#!/usr/bin/env node
'use strict';
const pkg = require('./package.json');
const begoo = require('./');

require('taketalk')({
  init(input, options) {
    console.log(begoo(input, options));
  },
  help() {
    console.log([
      '',
      '  ' + pkg.description,
      '',
      '  Usage',
      '    begoo <string>',
      '    begoo <string> --maxLength 8',
      '    begoo <string> --avatar name',
      '    Available names: cat, dog, chicken, monkey and tux',
      '    echo <string> | begoo',
      '',
      '  Example',
      '    begoo "Amin forked the code from Sindre"',
      begoo('Amin forked the code from Sindre')
    ].join('\n'));
  },
  version: pkg.version
});
