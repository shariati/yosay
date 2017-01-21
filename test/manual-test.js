'use strict';
var chalk = require('chalk');
var begoo = require('../');

/*
 * Yo. Fire this file locally with `node test/manual-test.js` at least after you
 * have newly generated the text fixtures to double check that all available
 * option have a correct looking output.
 * Thanks (ᵔᴥᵔ)
 */

console.log(begoo('Hello, and welcome to my fantastic generator full of whimsy and bubble gum!'));

console.log(begoo('Hi'));

console.log(begoo('Welcome to Yeoman, ladies and gentlemen!'));

console.log(begoo('Hi', {maxLength: 8}));

console.log(begoo('Hello, buddy!', {maxLength: 4}));

console.log(begoo(chalk.red.bgWhite('Hi')));

console.log(begoo(chalk.red.bgWhite('Hi') + ' there, sir!'));

console.log(begoo(chalk.red.bgWhite('Hi') + ' there, sir! ' + chalk.bgBlue.white('you are looking') + ' swell today!'));

console.log(begoo('first line\nsecond line\n\nfourth line'));

console.log(begoo('项目可以更新了'));

console.log(begoo('iloveunicornsiloveunicornsiloveunicornsiloveunicornsiloveunicornsiloveunicorns'));

console.log(begoo('Lie on your belly and purr when you are asleep shove bum in owner’s face like camera lens. Cough furball.', {maxLength: 11}));
console.log(begoo('Lie on your belly and purr when you are asleep shove bum in owner’s face like camera lens. Cough furball. Cough furball. Cough furball. Cough furball. Cough furball. Cough furball. Cough furball. Cough furball. Cough furball. Cough furball. Cough furball. Cough furball. Cough furball.'));
console.log(begoo('Lie on your belly and purr when you are asleep shove bum in owner’s face like camera lens. Cough furball. Cough furball. Cough furball. Cough furball. Cough furball. Cough furball. Cough furball. Cough furball. Cough furball. Cough furball. Cough furball. Cough furball. Cough furball.', {maxLength: 11}));
console.log(begoo('Lie on your belly and purr when you are asleep shove bum in owner’s face like camera lens. Cough furball. Cough furball. Cough furball. Cough furball. Cough furball. Cough furball. Cough furball. Cough furball. Cough furball. Cough furball. Cough furball. Cough furball. Cough furball.', {maxLength: 26}));

console.log(begoo(
  'That’s it. Feel free to fire up the server with ' +
  chalk.green('`npm run start:dev`') +
  'or use our subgenerator to create endpoints.'
));

console.log(begoo('That’s it. Feel free to fire up the server with `npm run start:dev` or use our subgenerator to create endpoints.'));

console.log(begoo(
  'That’s it. Feel free to fire up the server with ' +
  chalk.green('`npm run start:dev`') + '.'
));

console.log(begoo(
  'That’s it. Feel free to fire up the server with ' +
  '`npm run start:dev`.'
));
