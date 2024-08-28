[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) ![NPM Version](https://img.shields.io/npm/v/%40bsartori%2Fweeb-logger)


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
  containerStyle: {
    position: 'bottom-left',
    width: 800,
    height: 800,
    opacity: 1,
    lineHeight: 20,
  },
  waifu: 'alya'
});

logger.info('SOME LABEL', 'A string or object here!');
logger.warn('WARN', 'This is an warning');
logger.error('Api Error', 'This is an error');
logger.success('JSON', { lorem: 'ipsum', dolor: {
  sit: 'amet'
}});
logger.highlight('IMPORTANT', 'This is an highlight info');
```

This will result in:

![Log in DevTools](https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/devtools-log.jpg)


### Using visual: true will create the visual logger container on your web project

![Log in DevTools](https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/logger-on-web-project.jpg)

### Resizable
![Log in DevTools](https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/resizing.gif)

### Available Waifus
```
name: 'akeno'
```
![Log in DevTools](https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/logger-akeno.jpg)
```
name: 'alya'
```
![Log in DevTools](https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/logger-alya.jpg)
```
name: 'tohka'
```
![Log in DevTools](https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/logger-tohka.jpg)
```
name: 'aqua'
```
![Log in DevTools](https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/logger-aqua.jpg)
```
name: 'ayano'
```
![Log in DevTools](https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/logger-ayano.jpg)
```
name: 'darkness'
```
![Log in DevTools](https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/logger-darkness.jpg)
```
name: 'koneko'
```
![Log in DevTools](https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/logger-koneko.jpg)
```
name: 'masha'
```
![Log in DevTools](https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/logger-masha.jpg)
```
name: 'megumin'
```
![Log in DevTools](https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/logger-megumin.jpg)
```
name: 'yuki'
```
![Log in DevTools](https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/logger-yuki.jpg)
```
name: 'zerotwo'
```
![Log in DevTools](https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/logger-zerotwo.jpg)


## Testing

To test the package, simply run:

```sh
yarn test
```
Please make sure all tests pass before submiting a PR

![Log in DevTools](https://raw.githubusercontent.com/bruno-sartori/weeb-logger/main/docs/test.jpg)

## Technologies used in this project

| Name           | Description                                                                                                                             |
|----------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| [Node.js](https://nodejs.org/en)                                      | Node.js is a Javascript runtime bbuild on Chrome`s V8 JavaScript                 |
| [Jest](https://jestjs.io/)                                            | Jest is a JavaScript framework for testing                                       |
| [Typescript](https://www.typescriptlang.org)                          | Typescript extends JavaScript by adding types to the language                    |
| [Chalk](https://github.com/chalk/chalk)                               | Chalk is a nodejs dependency for terminal string                                 |
| [Canvas](https://developer.mozilla.org/pt-BR/docs/Web/API/Canvas_API) | Canvas provides a means for drawing graphics via JavaScript and the HTML element |


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](./LICENSE)
