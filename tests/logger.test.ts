/**
 * @jest-environment jsdom
 */

import logger from '../src';
import { setupJestCanvasMock } from 'jest-canvas-mock';

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D | null;

beforeEach(() => {
  const resizable = document.getElementById('weeb-logger');
  if (resizable) {
    resizable.innerHTML = '';
    document.body.removeChild(resizable)
  }
  jest.resetAllMocks();
  setupJestCanvasMock();
});

it('Should create a log content on log container and break lines if the container width is too small to fit entire message', () => {
  const logSpy = jest.spyOn(global.console, 'log').mockImplementation(() => { });

  logger.configure({
    enabled: true,
    visual: true,
    containerStyle: {
      width: 190
    }
  });

  canvas = document.getElementById('log-canvas') as HTMLCanvasElement;
  ctx = canvas.getContext('2d');
  const ctxSpy = jest.spyOn(ctx as {}, 'fillText' as never);

  logger.info('test', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scelerisque ornare venenatis.');
  expect(ctx?.fillText).toHaveBeenCalledTimes(4);
  expect(ctxSpy.mock.calls[1][0]).toBe('test');
  expect(ctxSpy.mock.calls[2][0]).toBe(' - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scelerisque ');
  expect(ctxSpy.mock.calls[3][0]).toBe('ornare venenatis.');

  logSpy.mockRestore();
});

it('Should do nothing if enabled is false', () => {
  const logSpy = jest.spyOn(global.console, 'log').mockImplementation(() => { });

  logger.configure({
    enabled: false,
    visual: true
  });

  logger.info('test', 'Lorem ipsum dolor sit amet.');

  const container = document.getElementById('log-container');

  expect(container).toBeNull();
  expect(logSpy).not.toHaveBeenCalled();

  logSpy.mockRestore();
});

it('Should not create a log container if visible is false', () => {
  logger.configure({
    enabled: true,
    visual: false
  });

  const container = document.getElementById('log-container');

  expect(container).toBeNull();
});

it('Should create a log container if instantiated with visual: true option', () => {
  logger.configure({
    enabled: true,
    visual: true
  });

  const container = document.getElementById('log-container');
  expect(container).not.toBeNull();
});

it('should clear console when clear() is called', () => {
  const clearLogSpy = jest.spyOn(global.console, 'clear');
  logger.clear();

  expect(clearLogSpy).toHaveBeenCalled();

  clearLogSpy.mockRestore();
})

it('Should call console.log function on logger.info', () => {
  const logSpy = jest.spyOn(global.console, 'log').mockImplementation(() => { });

  logger.configure({
    enabled: true,
    visual: false
  });

  logger.info('test', 'Lorem ipsum dolor sit amet.');
  logger.info('test', 'Consectetur adipsing elit.');

  expect(logSpy).toHaveBeenCalled();
  expect(logSpy).toHaveBeenCalledTimes(2);
  expect(/test/.test(logSpy.mock.calls[0][1])).toBe(true); // use this to test label because of color
  expect(logSpy.mock.calls[0][2]).toBe(' - Lorem ipsum dolor sit amet.');
  expect(/test/.test(logSpy.mock.calls[1][1])).toBe(true); // use this to test label because of color
  expect(logSpy.mock.calls[1][2]).toBe(' - Consectetur adipsing elit.');

  logSpy.mockRestore();
});

it('Should call console.log function on logger.success', () => {
  const logSpy = jest.spyOn(global.console, 'log').mockImplementation(() => { });

  logger.configure({
    enabled: true,
    visual: false
  });

  logger.success('test', 'Lorem ipsum dolor sit amet.');
  logger.success('test', 'Consectetur adipsing elit.');

  expect(logSpy).toHaveBeenCalled();
  expect(logSpy).toHaveBeenCalledTimes(2);
  expect(/test/.test(logSpy.mock.calls[0][1])).toBe(true); // use this to test label because of color
  expect(logSpy.mock.calls[0][2]).toBe(' - Lorem ipsum dolor sit amet.');
  expect(/test/.test(logSpy.mock.calls[1][1])).toBe(true); // use this to test label because of color
  expect(logSpy.mock.calls[1][2]).toBe(' - Consectetur adipsing elit.');

  logSpy.mockRestore();
});

it('Should call console.log function on logger.warn', () => {
  const logSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { });

  logger.configure({
    enabled: true,
    visual: false
  });

  logger.warn('test', 'Lorem ipsum dolor sit amet.');
  logger.warn('test', 'Consectetur adipsing elit.');

  expect(logSpy).toHaveBeenCalled();
  expect(logSpy).toHaveBeenCalledTimes(2);
  expect(/test/.test(logSpy.mock.calls[0][1])).toBe(true); // use this to test label because of color
  expect(logSpy.mock.calls[0][2]).toBe(' - Lorem ipsum dolor sit amet.');
  expect(/test/.test(logSpy.mock.calls[1][1])).toBe(true); // use this to test label because of color
  expect(logSpy.mock.calls[1][2]).toBe(' - Consectetur adipsing elit.');

  logSpy.mockRestore();
});

it('Should call console.log function on logger.error', () => {
  const logSpy = jest.spyOn(global.console, 'error').mockImplementation(() => { });

  logger.configure({
    enabled: true,
    visual: false
  });

  logger.error('test', 'Lorem ipsum dolor sit amet.');
  logger.error('test', 'Consectetur adipsing elit.');

  expect(logSpy).toHaveBeenCalled();
  expect(logSpy).toHaveBeenCalledTimes(2);
  expect(/test/.test(logSpy.mock.calls[0][1])).toBe(true); // use this to test label because of color
  expect(logSpy.mock.calls[0][2]).toBe(' - Lorem ipsum dolor sit amet.');
  expect(/test/.test(logSpy.mock.calls[1][1])).toBe(true); // use this to test label because of color
  expect(logSpy.mock.calls[1][2]).toBe(' - Consectetur adipsing elit.');

  logSpy.mockRestore();
});

it('Should call console.log function on logger.highlight', () => {
  const logSpy = jest.spyOn(global.console, 'log').mockImplementation(() => { });

  logger.configure({
    enabled: true,
    visual: false
  });

  logger.highlight('test', 'Lorem ipsum dolor sit amet.');
  logger.highlight('test', 'Consectetur adipsing elit.');

  expect(logSpy).toHaveBeenCalled();
  expect(/test/.test(logSpy.mock.calls[0][1])).toBe(true); // use this to test label because of color
  expect(logSpy.mock.calls[0][2]).toBe(' - Lorem ipsum dolor sit amet.');
  expect(/test/.test(logSpy.mock.calls[1][1])).toBe(true); // use this to test label because of color
  expect(logSpy.mock.calls[1][2]).toBe(' - Consectetur adipsing elit.');
  expect(logSpy).toHaveBeenCalledTimes(2);

  logSpy.mockRestore();
});

it('Should be able to log objects', () => {
  const logSpy = jest.spyOn(global.console, 'log').mockImplementation(() => { });
  const logObj = { lorem: { ipsum: { dolor: 'sit', amet: 'consectetur' }, adipscing: ['elit', 'elit2', 'elit3'] } };

  logger.configure({
    enabled: true,
    visual: false
  });

  logger.info('test', logObj);

  function deepCheck(obj1: any, obj2: any) {
    // check if objects are of same type
    if (typeof obj1 !== typeof obj2) {
      return false;
    }

    // If both objects are primitive values, compare their values using ===
    if (typeof obj1 !== "object" || obj1 === null || obj2 === null) {
      return obj1 === obj2;
    }

    // Check if both objects have the same number of properties
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
      return false;
    }

    // Recursively compare the properties of the objects
    for (const key of keys1) {
      if (!keys2.includes(key) || !deepCheck(obj1[key], obj2[key])) {
        return false;
      }
    }

    return true;
  }

  expect(logSpy).toHaveBeenCalled();
  expect(deepCheck(JSON.parse(logSpy.mock.calls[0][2].replace(' - ', '')), logObj)).toBeTruthy();

  logSpy.mockRestore();
});

it('Should be positioned on the upper left corner', () => {
  logger.configure({
    enabled: true,
    visual: true,
    containerStyle: {
      position: 'top-left'
    }
  });

  const container = document.getElementById('weeb-logger');
  expect(container?.className).toBe('top-left');
});

it('Should be positioned on the upper left corner', () => {
  logger.configure({
    enabled: true,
    visual: true,
    containerStyle: {
      position: 'top-right'
    }
  });

  const container = document.getElementById('weeb-logger');
  expect(container?.className).toBe('top-right');
});

it('Should be positioned on the upper left corner', () => {
  logger.configure({
    enabled: true,
    visual: true,
    containerStyle: {
      position: 'bottom-left'
    }
  });

  const container = document.getElementById('weeb-logger');
  expect(container?.className).toBe('bottom-left');
});

it('Should be positioned on the upper left corner', () => {
  logger.configure({
    enabled: true,
    visual: true,
    containerStyle: {
      position: 'bottom-right'
    }
  });

  const container = document.getElementById('weeb-logger');
  expect(container?.className).toBe('bottom-right');
});

