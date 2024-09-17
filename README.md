[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)  [![](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/bruno-sartori) ![NPM Version](https://img.shields.io/npm/v/%40bsartori%2Fweeb-logger) ![Build Passing](https://img.shields.io/badge/Build-Passing-green.svg)


# Weeb Logger

Weeb Logger is a JS Canvas component for logging on devices that are problematic to use debugging tools (specially if you are using some external framework for developing those ahead) like Samsung Tizen, LG webOS or Chromecast. Plus you can customize it with your favorite waifu! :3

## Installation

Use your favorite package manager, mine is:

```bash
yarn add @bsartori/weeb-logger
```

## Usage

```tsx
import logger from '@bsartori/logger';

logger.configure({
  enabled: true,
  visual: true,
  enableStackTrace: true,
  containerStyle: {
    position: 'bottom-left',
    width: 800,
    height: 800,
    opacity: 1,
    lineHeight: 20,
  },
  waifu: {
    name: 'alya',
    useTheme: true,
    showWaifu: true,
  },
});

logger.info('SOME LABEL', 'A string or object here!');
logger.warn('WARN', 'This is an warning');
logger.error('Api Error', 'This is an error');
logger.success('JSON', { lorem: 'ipsum', dolor: {
  sit: 'amet'
}});
logger.highlight('IMPORTANT', 'This is an highlight info');
try {
  throw new Error('I can also log Error objects!');
} catch (error: any) {
  logger.error('ERROR OBJECT', error);
}
```

On DevTools this will result in:

![Log in DevTools](https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/devtools-log.jpg)

And in your application:

![Log in DevTools](https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/logger-on-web-project.jpg)

You can also resize the container:

![Log in DevTools](https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/resizing.gif)


### Log Message Structure

```
// message ---------------------------------------+
// label -------------------------+               |
// time diff from last log ---+   |               |
// datetime ---+              |   |               |
//             v              v   v               v
    [31/08/24 10:41:21:457] 10ms INFO - Lorem ipsum dolor sit amet
```

### Available Waifus
| `akeno`     | `alya`      |
|-----------|-----------|
| <img src="https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/logger-akeno.jpg" width="400" height="400" /> | <img src="https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/logger-alya.jpg" width="400" height="400" /> |
| `tohka`     | `aqua`      |
| <img src="https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/logger-tohka.jpg" width="400" height="400" /> | <img src="https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/logger-aqua.jpg" width="400" height="400" /> |
| `ayano`     | `darkness`  |
| <img src="https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/logger-ayano.jpg" width="400" height="400" /> | <img src="https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/logger-darkness.jpg" width="400" height="400" /> |
| `koneko`    | `masha`     |
| <img src="https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/logger-koneko.jpg" width="400" height="400" /> | <img src="https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/logger-masha.jpg" width="400" height="400" /> |
| `megumin`   | `yuki`      |
| <img src="https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/logger-megumin.jpg" width="400" height="400" /> | <img src="https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/logger-yuki.jpg" width="400" height="400" /> |
| `zerotwo`   |           |
| <img src="https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/logger-zerotwo.jpg" width="400" height="400" /> |           |


## API

### Configuration Object
* *`enabled`: Boolean (default: true)* - Set to `false` to completely disable weeb-logger
* *`visual`: Boolean (default: true)* - Set to `false` to only disable visual container (logging on DevTools or node cmd will still work)
* *`formatStackTrace`: Boolean (default: true)* - Uses [stacktrace.js](https://github.com/stacktracejs/stacktrace.js) to format error stacktraces when the log message is an instance of `Error`. This way stack traces will show original files rather than bundled files. It makes HTTP requests to sourcemaps.
* *`containerStyle`: Object(IWeebLoggerContainerStyle)* - Container style configuration object.
    * *`width`: Number (default: 800)* - Width of the container.
    * *`height`: Number (default: 800)* - Height of the container.
    * *`position`: TWeebLoggerContainerPosition (default: 'bottom-right')* - Available values: `top-right`, `top-left`, `bottom-right` and `bottom-left`.
    * *`opacity`: Number (default: 1)* - Decrease this value if you want to see content that is below the visual container.
    * *`lineHeight`: Number (default: 20) - Line height for log messages on the visual container.
* *`waifu`: Object(IWeebLoggerWaifu)* - Waifu configuration object.
    * *`showWaifu`: (default: true)* - Set to `false` to remove Waifu image.
    * *`name`: (default: 'tohka')*: Selects waifu to display. Available values: `akeno`, `alya`, `aqua`, `ayano`, `darkness`, `koneko`, `masha`, `megumin`, `tohka`, `yuki`, `zerotwo`.
    * *`useTheme`: (default: true)* - Uses Waifu theme style, set to `false` to use default theme style.

### Methods

#### `logger.info(label: string, message: string | object)` => void
Shows log with a <span style="color:#1b81a8;">*blue*</span> label.

#### `logger.success(label: string, message: string | object)` => void
Shows log with a <span style="color:#108327;">*green*</span> label.

#### `logger.warn(label: string, message: string | object)` => void
Shows log with a <span style="color:#e7f531;">*yellow*</span> label. Shows stacktrace on DevTools.

#### `logger.error(label: string, message: string | object)` => void
Shows log with a <span style="color:#ba1e18;">*red*</span> label. Shows stacktrace on DevTools and if the message is an instance of `Error` object it will also show stack trace on the visual container.

#### `logger.highlight(label: string, message: string | object)` => void
Shows log with a <span style="color:#993d99;">*purple*</span> label.

#### `logger.clear()` => void
Clears the log container and DevTools console screen.

## Testing

To test the package, simply run:

```sh
yarn test
```
Please make sure all tests pass before submiting a PR

![Log in DevTools](https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/test.jpg)

## Roadmap 
Would love Pull requests that build towards these objectives and even ideas for new objectives :3
 - [x] ~~Decrease package size (As waifu images increase, we'll need to store them on a CDN or something like that)~~ Solved by using GitHub URL to the raw image LOL
 - [x] Configure ESLint
 - [x] Improve README.md
 - [ ] Tests
   - [ ] Resize (aparently jest-dom doesn't support getting element dimensions)
   - [ ] !isNode (maybe find another way to determine if environment is nodejs or browser other than ```typeof process === 'object' && `${process}\` === '[object process]')```
 - [ ] Add a CI pipeline that runs the tests
 - [ ] Add more waifus! It would be very cool if some artist drew them for us :heart_eyes:
 - [ ] Log levels
 - [ ] Increase customization options
 - [ ] Organize this mess I call code :laughing:

## Technologies used in this project

| Name           | Description                                                                                                                             |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| [Node.js](https://nodejs.org/en)                                      | Node.js is a Javascript runtime build on Chrome`s V8 JavaScript                 |
| [Jest](https://jestjs.io/)                                            | Jest is a JavaScript framework for testing                                       |
| [Typescript](https://www.typescriptlang.org)                          | Typescript extends JavaScript by adding types to the language                    |
| [Chalk](https://github.com/chalk/chalk)                               | Chalk is a Node.js dependency for terminal string                                 |
| [stacktrace.js](https://github.com/stacktracejs/stacktrace.js)        | stacktrace.js is a Node.js module for formatting JavaScript stack traces in all browsers |
| [Canvas](https://developer.mozilla.org/pt-BR/docs/Web/API/Canvas_API) | Canvas provides a means for drawing graphics via JavaScript and the HTML element |


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](./LICENSE)
