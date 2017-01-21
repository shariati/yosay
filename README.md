# begoo [![Build Status](https://travis-ci.org/shariati/begoo.svg?branch=master)](https://travis-ci.org/shariati/begoo)[![Coverage Status](https://coveralls.io/repos/github/shariati/begoo/badge.svg?branch=master)](https://coveralls.io/github/shariati/begoo?branch=master)

> Say Something

Like [yosay](https://github.com/yeoman/yosay), with some avatars. Special thanks to [sindresorhus] for creating such an awesome script.

![](screenshot.png)


## Install

```
$ npm install --save begoo
```


## Usage

```js
const begoo = require('begoo');

console.log(begoo('Welcome to Begoo! \n Meow ...'));

/*
     |\_/|     
    / @ @ \    ╭──────────────────────────╮
   ( > º < )   │     Welcome to Begoo!    │
    `>>x<<´    │         Meow ...         │
    /  O  \    ╰──────────────────────────╯

 */
```

*You can style your text with [chalk](https://github.com/sindresorhus/chalk) before passing it to `begoo`.*


## CLI

```
$ npm install --global begoo
```

```
$ begoo --help

  Usage
    begoo <string>
    begoo <string> --maxLength 8
    echo <string> | yosay

  Example
    begoo 'Amin forked the code from Sindre'

     |\_/|     
    / @ @ \    ╭──────────────────────────╮
   ( > º < )   │   Amin forked the code   │
    `>>x<<´    │        from Sindre       │
    /  O  \    ╰──────────────────────────╯

```


## License

[BSD license](http://opensource.org/licenses/bsd-license.php)