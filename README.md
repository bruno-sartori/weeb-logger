[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) 

# Weeb Logger

Weeb Logger is a JS Canvas component for logging on devices that are problematic to use debugging tools (specially if you are using some external framework for developing those ahead) like Samsung Tizen, LG webOS or Chromecast. Plus you can customize it with your favorite waifu! :3 

## Installation

Use your favorite package manager, mine is:

```bash
yarn add @sartori/weeb-logger
```

## Usage

```tsx
import logger from '@sartori/logger';

logger.configure({
  enabled: true,
  visual: true,
  containerStyle: {
    position: 'bottom-left'
  },
  waifu: 'alya'
});

logger.info('SOME LABEL', 'A string or object here!');
logger.warning('WARN', 'This is an warning');
logger.error('Api Error', 'This is an error');
logger.success('JSON', { lorem: 'ipsum', dolor: {
  sit: 'amet'
}});
logger.highlight('IMPORTANT', 'This is an highlight info');
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](./LICENSE)
