import * as utils from '../src/utils';

describe('Variable type checks should work as expected', () => {
    test('isNull()', () => {
        expect(utils.isNull("null")).not.toBeTruthy();
        expect(utils.isNull(null)).toBeTruthy();
    });
    test('isUndefined()', () => {
        expect(utils.isUndefined('undefined')).not.toBeTruthy();
        expect(utils.isUndefined(undefined)).toBeTruthy();
    });
    test('isValidArray()', () => {
        expect(utils.isValidArray(null)).not.toBeTruthy();
        expect(utils.isValidArray(undefined)).not.toBeTruthy();
        expect(utils.isValidArray([])).not.toBeTruthy();
        expect(utils.isValidArray([1, 2, 3])).toBeTruthy();
    });

    test('isValidString()', () => {
        expect(utils.isValidString(null)).not.toBeTruthy();
        expect(utils.isValidString(undefined)).not.toBeTruthy();
        expect(utils.isValidString([])).not.toBeTruthy();
        expect(utils.isValidString('')).not.toBeTruthy();
        expect(utils.isValidString('null')).not.toBeTruthy();
        expect(utils.isValidString('undefined')).not.toBeTruthy();
        expect(utils.isValidString('lorem ipsum dolor sit amet')).toBeTruthy();
    });

    test('isBoolean()', () => {
        expect(utils.isBoolean('lorem ipsum dolor sit amet')).not.toBeTruthy();
        expect(utils.isBoolean(1)).not.toBeTruthy();
        expect(utils.isBoolean(0)).not.toBeTruthy();
        expect(utils.isBoolean([])).not.toBeTruthy();
        expect(utils.isBoolean(true)).toBeTruthy();
        expect(utils.isBoolean(false)).toBeTruthy();
    });
    
    test('isValidObject()', () => {
        expect(utils.isValidObject([])).not.toBeTruthy();
        expect(utils.isValidObject(undefined)).not.toBeTruthy();
        expect(utils.isValidObject(null)).not.toBeTruthy();
        expect(utils.isValidObject('lorem ipsum')).not.toBeTruthy();
        expect(utils.isValidObject(true)).not.toBeTruthy();
        expect(utils.isValidObject({})).toBeTruthy();
        expect(utils.isValidObject({ key: 'value' })).toBeTruthy();
    });

    test('isValidNumber()', () => {
        expect(utils.isValidNumber([])).not.toBeTruthy();
        expect(utils.isValidNumber(undefined)).not.toBeTruthy();
        expect(utils.isValidNumber(null)).not.toBeTruthy();
        expect(utils.isValidNumber('lorem ipsum')).not.toBeTruthy();
        expect(utils.isValidNumber(true)).not.toBeTruthy();
        expect(utils.isValidNumber({})).not.toBeTruthy();
        expect(utils.isValidNumber(0)).toBeTruthy();
        expect(utils.isValidNumber(9999999999)).toBeTruthy();
        expect(utils.isValidNumber(99999.99999)).toBeTruthy();
    });
})
