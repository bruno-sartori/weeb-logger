/**
 * @jest-environment jsdom
 */

import logger from '../src';

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

it('Should create a <p> with log content on log container', () => {
    const logSpy = jest.spyOn(global.console, 'log').mockImplementation(() => { });

    logger.configure({
      enabled: true, 
      visual: true
    });

    logger.info('test', 'Lorem ipsum dolor sit amet.');

    const container = document.getElementById('log-container');

    expect(container?.innerHTML).not.toHaveLength(0);
    expect(/test/.test(container?.innerHTML as string)).toBe(true);
    expect(/Lorem ipsum dolor sit amet./.test(container?.innerHTML as string)).toBe(true);

    logSpy.mockRestore();
});

it('Should call console.log function on logger.info', () => {
    const logSpy = jest.spyOn(global.console, 'log').mockImplementation(() => { });

    logger.configure({
      enabled: true, 
      visual: true
    });

    logger.info('test', 'Lorem ipsum dolor sit amet.');
    logger.info('test', 'Consectetur adipsing elit.');

    expect(logSpy).toHaveBeenCalled();
    expect(/test/.test(logSpy.mock.calls[0][0])).toBe(true); // use this to test label because of color
    expect(logSpy.mock.calls[0][1]).toBe('Lorem ipsum dolor sit amet.');
    expect(/test/.test(logSpy.mock.calls[1][0])).toBe(true); // use this to test label because of color
    expect(logSpy.mock.calls[1][1]).toBe('Consectetur adipsing elit.');
    expect(logSpy).toHaveBeenCalledTimes(2);

    logSpy.mockRestore();
});

it('Should call console.log function on logger.success', () => {
    const logSpy = jest.spyOn(global.console, 'log').mockImplementation(() => { });

    logger.configure({
      enabled: true, 
      visual: true
    });

    logger.success('test', 'Lorem ipsum dolor sit amet.');
    logger.success('test', 'Consectetur adipsing elit.');

    expect(logSpy).toHaveBeenCalled();
    expect(/test/.test(logSpy.mock.calls[0][0])).toBe(true); // use this to test label because of color
    expect(logSpy.mock.calls[0][1]).toBe('Lorem ipsum dolor sit amet.');
    expect(/test/.test(logSpy.mock.calls[1][0])).toBe(true); // use this to test label because of color
    expect(logSpy.mock.calls[1][1]).toBe('Consectetur adipsing elit.');
    expect(logSpy).toHaveBeenCalledTimes(2);

    logSpy.mockRestore();
});

it('Should call console.log function on logger.warn', () => {
    const logSpy = jest.spyOn(global.console, 'warn').mockImplementation(() => { });

    logger.configure({
      enabled: true, 
      visual: true
    });

    logger.warn('test', 'Lorem ipsum dolor sit amet.');
    logger.warn('test', 'Consectetur adipsing elit.');

    expect(logSpy).toHaveBeenCalled();
    expect(/test/.test(logSpy.mock.calls[0][0])).toBe(true); // use this to test label because of color
    expect(logSpy.mock.calls[0][1]).toBe('Lorem ipsum dolor sit amet.');
    expect(/test/.test(logSpy.mock.calls[1][0])).toBe(true); // use this to test label because of color
    expect(logSpy.mock.calls[1][1]).toBe('Consectetur adipsing elit.');
    expect(logSpy).toHaveBeenCalledTimes(2);

    logSpy.mockRestore();
});

it('Should call console.log function on logger.error', () => {
    const logSpy = jest.spyOn(global.console, 'error').mockImplementation(() => { });

    logger.configure({
      enabled: true, 
      visual: true
    });

    logger.error('test', 'Lorem ipsum dolor sit amet.');
    logger.error('test', 'Consectetur adipsing elit.');

    expect(logSpy).toHaveBeenCalled();
    expect(/test/.test(logSpy.mock.calls[0][0])).toBe(true); // use this to test label because of color
    expect(logSpy.mock.calls[0][1]).toBe('Lorem ipsum dolor sit amet.');
    expect(/test/.test(logSpy.mock.calls[1][0])).toBe(true); // use this to test label because of color
    expect(logSpy.mock.calls[1][1]).toBe('Consectetur adipsing elit.');
    expect(logSpy).toHaveBeenCalledTimes(2);

    logSpy.mockRestore();
});

it('Should call console.log function on logger.highlight', () => {
    const logSpy = jest.spyOn(global.console, 'log').mockImplementation(() => { });

    logger.configure({
      enabled: true, 
      visual: true
    });

    logger.highlight('test', 'Lorem ipsum dolor sit amet.');
    logger.highlight('test', 'Consectetur adipsing elit.');

    expect(logSpy).toHaveBeenCalled();
    expect(/test/.test(logSpy.mock.calls[0][0])).toBe(true); // use this to test label because of color
    expect(logSpy.mock.calls[0][1]).toBe('Lorem ipsum dolor sit amet.');
    expect(/test/.test(logSpy.mock.calls[1][0])).toBe(true); // use this to test label because of color
    expect(logSpy.mock.calls[1][1]).toBe('Consectetur adipsing elit.');
    expect(logSpy).toHaveBeenCalledTimes(2);

    logSpy.mockRestore();
});

it('Should remove content of log container when logger.clear() is called', () => {
    const logSpy = jest.spyOn(global.console, 'log').mockImplementation(() => { });

    logger.configure({
      enabled: true, 
      visual: true
    });

    logger.info('test', 'Lorem ipsum dolor sit amet.');

    const container = document.getElementById('log-container');

    expect(container?.innerHTML).not.toHaveLength(0);
    expect(/test/.test(container?.innerHTML as string)).toBe(true);
    expect(/Lorem ipsum dolor sit amet./.test(container?.innerHTML as string)).toBe(true);

    logger.clear();
    expect(container?.innerHTML.length).toBe(0);
    expect(/test/.test(container?.innerHTML as string)).toBe(false);
    expect(/Lorem ipsum dolor sit amet./.test(container?.innerHTML as string)).toBe(false);

    logSpy.mockRestore();
});


it('Should be able to log objects', () => {
    const logSpy = jest.spyOn(global.console, 'log').mockImplementation(() => { });
    const logObj = { lorem: { ipsum: { dolor: 'sit', amet: 'consectetur'}, adipscing: ['elit', 'elit2', 'elit3']}};

    logger.info('test', logObj);

    const shallowCompare = (a: any, b: any) => {
        for(const key in a) {
            if(!(key in b) || a[key] !== b[key]) {
                return false;
            }
        }
        for(const key in b) {
            if(!(key in a) || a[key] !== b[key]) {
                return false;
            }
        }
        return true;
    }

    expect(logSpy).toHaveBeenCalled();
    expect(shallowCompare(JSON.parse(logSpy.mock.calls[0][1]), logObj)).toBeTruthy();
    
    logSpy.mockRestore();
});
