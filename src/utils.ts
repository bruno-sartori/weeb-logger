import { StackFrame } from "stacktrace-js";

export const isNull = (value: any): boolean => value === null;

export const isUndefined = (value: any): boolean => typeof value === 'undefined';

export const isValidArray = (array: any): boolean => !isNull(array) && !isUndefined(array) && array.constructor === Array && array.length > 0;

export const isValidString = (string: any): boolean => !isNull(string) && !isUndefined(string) && string.constructor === String && string !== '' && string !== 'null' && string !== 'undefined';

export const isBoolean = (value: any): boolean => typeof value === 'boolean';

export const isValidObject = (value: any): boolean => !isNull(value) && !isUndefined(value) && value.constructor === Object && typeof value === 'object';

export const isValidNumber = (value: any): boolean => !isNull(value) && !isUndefined(value) && !isNaN(value) && typeof value === 'number';

export const getRemSizes = (): number => {
  const screenWidth = window.screen.width;
  
  if (screenWidth >= 1920) {
    return 16;
  }

  if (screenWidth >= 1280) {
    return 12;
  }

  return 10;
}

export const pxToRem = (px: number | string): string => {
  const base = getRemSizes();

  const tempPx = `${px}`.replace('px', '')

  return (1 / base) * parseInt(tempPx) + 'rem'
}

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Jannuary is 0!
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}:${milliseconds}`;
}

export const getTimeDiff = (date1: Date, date2: Date): string => {
  // Calcula a diferença em milissegundos
  let diff = Math.abs(date2.getTime() - date1.getTime());

  // Extrai horas, minutos, segundos e milissegundos
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);

  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);

  const seconds = Math.floor(diff / 1000);
  diff -= seconds * 1000;

  const milliseconds = diff;

  // Constrói a string de resultado
  let result = '';
  if (hours > 0) {
      result += `${hours}h`;
  }
  if (minutes > 0 || hours > 0) {
      result += `${minutes}m`;
  }
  if (seconds > 0 || minutes > 0 || hours > 0) {
      result += `${seconds}s`;
  }
  result += `${milliseconds}ms`;

  return result;
};

export const formatErrorWithStackTrace = (message: string, stackTrace: Array<StackFrame>) => {
  let formattedErrorWithStackTrace = `${message}\n`;

  for (let i = 0; i < stackTrace.length; i++) {
    const stack = stackTrace[i];
    formattedErrorWithStackTrace += `   at ${stack.functionName} (${stack.fileName?.replace(/^.*[\\/]/, '')}:${stack.lineNumber})\n`;
  }

  return formattedErrorWithStackTrace;
}
