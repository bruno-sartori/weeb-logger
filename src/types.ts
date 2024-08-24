import { IWeebLoggerConfig, IContainerStyle } from "./interfaces";

export declare type LogType = 'log' | 'warn' | 'error';

// Tipo auxiliar para tornar todas as propriedades obrigatórias e profundas
type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object 
    ? T[P] extends (...args: any[]) => any 
      ? T[P] 
      : DeepRequired<Required<T[P]>>
    : T[P];
};

declare type IRequiredContainerStyle = DeepRequired<IContainerStyle>;

// Ajustando a configuração do logger para usar IRequiredContainerStyle para containerStyle
export declare type IWeebRequiredLoggerConfig = Omit<DeepRequired<IWeebLoggerConfig>, 'containerStyle'> & {
  containerStyle: IRequiredContainerStyle;
};
