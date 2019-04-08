'use strict'
const chalk = require('chalk')
const pad = require('pad-component')
const wrap = require('wrap-ansi')
const stringWidth = require('string-width')
const stripAnsi = require('strip-ansi')
const ansiStyles = require('ansi-styles')
const ansiRegex = require('ansi-regex')()
const repeating = require('repeating')
const cliBoxes = require('cli-boxes')
const _ = require('lodash')

const border = cliBoxes.round
let leftOffset = 15

const DEFAULT_GREETING =
  '\n     |\\_/|     ' +
  '\n    / ' + chalk.yellow('@') + ' ' + chalk.yellow('@') + ' \\    ' +
  '\n   ( > º < )   ' +
  '\n    `' + chalk.yellow('>>') + chalk.red('x') + chalk.yellow('<<') + '´    ' +
  '\n    /  O  \\    '

const AVATAR_LIST = [{
  name: 'cat',
  layout: '\n     |\\_/|     ' +
    '\n    / ' + chalk.yellow('@') + ' ' + chalk.yellow('@') + ' \\    ' +
    '\n   ( > º < )   ' +
    '\n    `' + chalk.yellow('>>') + chalk.red('x') + chalk.yellow('<<') + '´    ' +
    '\n    /  O  \\    ',
  width: 15,
  leftOffset: 15
},
{
  name: 'dog',
  layout: '\n             __       ' +
    '\n            /  \\      ' +
    '\n           / ..|\\     ' +
    '\n          (_\\  |_)    ' +
    '\n          /  \\@\'      ' +
    '\n         /     \\      ' +
    '\n    _   /  `   |       ' +
    '\n    \\\\/  \\  | _\\   ' +
    '\n     \\   /_ || \\\\_  ' +
    '\n      \\____)|_) \\_)  ',
  width: 22,
  leftOffset: 15
},
{
  name: 'chicken',
  layout: '\n      \\\\     ' +
    '\n      (o>    ' +
    '\n   \\\\_//)    ' +
    '\n    \\_/_)    ' +
    '\n     _|_     ',
  width: 16,
  leftOffset: 13
},
{
  name: 'monkey',
  layout:
  '\n      /~\\      ' +
  '\n     C oo      ' +
  '\n     _( ^)     ' +
  '\n    /   ~\\     ',
  width: 16,
  leftOffset: 15
},
{
  name: 'tux',
  layout:
  '\n       .--.        ' +
  '\n      |o_o |       ' +
  '\n      |:_/ |       ' +
  '\n     //   \\ \\      ' +
  '\n    (|     | )     ' +
  '\n   /\'\\_   _/`\\     ' +
  '\n   \\___)=(___/     ',
  width: 16,
  leftOffset: 15
}
]

module.exports = function (message, options) {
  message = (message || 'Welcome to Begoo! \n Meow ...').trim()
  options = options || {}

  /*
   * What you're about to see may confuse you. And rightfully so. Here's an
   * explanation.
   *
   * When yosay is given a string, we create a duplicate with the ansi styling
   * sucked out. This way, the true length of the string is read by `pad` and
   * `wrap`, so they can correctly do their job without getting tripped up by
   * the "invisible" ansi. Along with the duplicated, non-ansi string, we store
   * the character position of where the ansi was, so that when we go back over
   * each line that will be printed out in the message box, we check the
   * character position to see if it needs any styling, then re-insert it if
   * necessary.
   *
   * Better implementations welcome :)
   */

  let maxLength = 24
  let avatar = DEFAULT_GREETING
  let frame = ''
  const styledIndexes = {}
  let completedString = ''
  let regExNewLine = ''
  let topOffset = 4

  const DEFAULT_CHARACTER_WIDTH = 15

  // Amount of characters of the default top frame of the speech bubble → `╭──────────────────────────╮`
  const DEFAULT_TOP_FRAME_WIDTH = 20

  // Amount of characters of a total line
  let totalCharactersPerLine = DEFAULT_CHARACTER_WIDTH + DEFAULT_TOP_FRAME_WIDTH

  // The speech bubble will overflow the Yeoman character if the message is too long.
  const MAX_MESSAGE_LINES_BEFORE_OVERFLOW = 7

  if (options.maxLength) {
    maxLength = stripAnsi(message).toLowerCase().split(' ').sort()[0].length

    if (maxLength < options.maxLength) {
      maxLength = options.maxLength
      totalCharactersPerLine = maxLength + DEFAULT_CHARACTER_WIDTH + topOffset
    }
  }

  if (options.avatar) {
    avatar = stripAnsi(message).toLowerCase().split(' ').sort()[0].length

    avatar = _.find(AVATAR_LIST, {
      name: options.avatar
    })
    if (typeof avatar === 'undefined') {
      avatar = DEFAULT_GREETING
    } else {
      leftOffset = avatar.leftOffset
      avatar = avatar.layout
      totalCharactersPerLine = avatar.width + DEFAULT_TOP_FRAME_WIDTH
    }
  }

  regExNewLine = new RegExp('\\s{' + maxLength + '}')

  const borderHorizontal = repeating(maxLength + 2, border.horizontal)

  frame = {
    top: border.topLeft + borderHorizontal + border.topRight,
    side: ansiStyles.reset.open + border.vertical + ansiStyles.reset.open,
    bottom: ansiStyles.reset.open + border.bottomLeft + borderHorizontal + border.bottomRight
  }

  message.replace(ansiRegex, (match, offset) => {
    Object.keys(styledIndexes).forEach(key => {
      offset -= styledIndexes[key].length
    })

    styledIndexes[offset] = styledIndexes[offset] ? styledIndexes[offset] + match : match
  })

  return wrap(stripAnsi(message), maxLength, {
    hard: true
  })
    .split(/\n/)
    .reduce((greeting, str, index, array) => {
      let paddedString = ''

      if (!regExNewLine.test(str)) {
        str = str.trim()
      }

      completedString += str

      str = completedString
        .substr(completedString.length - str.length)
        .replace(/./g, (char, charIndex) => {
          if (index > 0) {
            charIndex += completedString.length - str.length + index
          }

          let hasContinuedStyle = 0
          let continuedStyle

          Object.keys(styledIndexes).forEach(offset => {
            if (charIndex > offset) {
              hasContinuedStyle++
              continuedStyle = styledIndexes[offset]
            }

            if (hasContinuedStyle === 1 && charIndex < offset) {
              hasContinuedStyle++
            }
          })

          if (styledIndexes[charIndex]) {
            return styledIndexes[charIndex] + char
          } else if (hasContinuedStyle >= 2) {
            return continuedStyle + char
          }

          return char
        })
        .trim()

      paddedString = pad({
        length: stringWidth(str),
        valueOf () {
          return ansiStyles.reset.open + str + ansiStyles.reset.open
        }
      }, maxLength)

      if (index === 0) {
        // Need to adjust the top position of the speech bubble depending on the
        // amount of lines of the message.
        if (array.length === 2) {
          topOffset -= 1
        }

        if (array.length >= 3) {
          topOffset -= 2
        }

        // The speech bubble will overflow the Yeoman character if the message
        // is too long. So we vertically center the bubble by adding empty lines
        // on top of the greeting.
        if (array.length > MAX_MESSAGE_LINES_BEFORE_OVERFLOW) {
          const emptyLines = Math.ceil((array.length - MAX_MESSAGE_LINES_BEFORE_OVERFLOW) / 2)

          for (let i = 0; i < emptyLines; i++) {
            greeting.unshift('')
          }

          frame.top = pad.left(frame.top, totalCharactersPerLine)
        }

        greeting[topOffset - 1] += frame.top
      }

      greeting[index + topOffset] =
        (greeting[index + topOffset] || pad.left('', leftOffset)) +
        frame.side + ' ' + paddedString + ' ' + frame.side

      if (array.length === index + 1) {
        greeting[index + topOffset + 1] =
          (greeting[index + topOffset + 1] || pad.left('', leftOffset)) +
          frame.bottom
      }

      return greeting
    }, avatar.split(/\n/))
    .join('\n') + '\n'
}
